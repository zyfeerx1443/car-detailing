"""
Semi-automatic WhatsApp sender for leads from scripts/leads/leads.csv.

For each contact it opens the chat in the installed WhatsApp Desktop app
(whatsapp://send?phone=...&text=...), waits for the text to load, brings
the WhatsApp window to the front and presses Enter. Sent numbers are
appended to scripts/leads/contacted.txt so they are never messaged twice.

Usage (from the repo root):
    python scripts/send_whatsapp.py              # first 5 eligible contacts
    python scripts/send_whatsapp.py --count 3
    python scripts/send_whatsapp.py --dry-run    # only show the list

Emergency stop: Ctrl+C in the console, or slam the mouse into a screen
corner (pyautogui fail-safe).
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import importlib
import os
import random
import re
import subprocess
import sys
import time
from pathlib import Path
from urllib.parse import quote

LEADS_DIR = Path(__file__).resolve().parent / "leads"
LEADS_CSV = LEADS_DIR / "leads.csv"
CONTACTED_TXT = LEADS_DIR / "contacted.txt"

OPEN_WAIT_SECONDS = (4.0, 5.0)  # wait for WhatsApp to open the chat + load text
PAUSE_SECONDS = (15.0, 20.0)  # anti-spam pause between contacts


def ensure_pyautogui():
    """Import pyautogui, installing it with pip if it is missing."""
    try:
        return importlib.import_module("pyautogui")
    except ImportError:
        print("pyautogui не установлен — устанавливаю (pip install pyautogui)...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pyautogui"])
        return importlib.import_module("pyautogui")


def normalize_phone(raw: str | None) -> str | None:
    digits = re.sub(r"\D", "", raw or "")
    if digits.startswith("00"):
        digits = digits[2:]
    if len(digits) == 9:
        digits = "48" + digits
    return digits if 10 <= len(digits) <= 15 else None


def load_contacted() -> set[str]:
    if not CONTACTED_TXT.exists():
        return set()
    numbers = set()
    for line in CONTACTED_TXT.read_text(encoding="utf-8").splitlines():
        # Drop comments (whole-line or inline "# name — sent <date>"), whose
        # digits would otherwise be glued onto the phone number.
        line = line.split("#", 1)[0].strip()
        if line:
            phone = normalize_phone(line)
            if phone:
                numbers.add(phone)
    return numbers


def mark_contacted(phone: str, name: str) -> None:
    stamp = dt.datetime.now().strftime("%Y-%m-%d %H:%M")
    with CONTACTED_TXT.open("a", encoding="utf-8") as f:
        f.write(f"+{phone}  # {name} — отправлено {stamp} (send_whatsapp.py)\n")


def load_contacts(count: int) -> list[dict]:
    if not LEADS_CSV.exists():
        sys.exit(f"Нет файла {LEADS_CSV} — сначала запустите scrape-leads.mjs.")

    contacted = load_contacted()
    contacts = []
    # utf-8-sig strips the BOM written for Excel.
    with LEADS_CSV.open(encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            phone = normalize_phone(row.get("phone_e164") or row.get("phone"))
            message = (row.get("message") or "").strip()
            if not phone or not message:
                continue
            if row.get("is_mobile", "").strip().lower() != "true":
                continue  # landlines usually have no WhatsApp
            if phone in contacted:
                continue
            contacts.append(
                {
                    "name": row.get("short_name") or row.get("name") or phone,
                    "phone": phone,
                    "message": message,
                }
            )
            if len(contacts) >= count:
                break
    return contacts


def focus_whatsapp(pyautogui) -> bool:
    """Bring the WhatsApp Desktop window to the foreground."""
    try:
        windows = [w for w in pyautogui.getWindowsWithTitle("WhatsApp") if w.title.strip()]
    except Exception:
        return False
    if not windows:
        return False
    win = windows[0]
    try:
        if win.isMinimized:
            win.restore()
        win.activate()
    except Exception:
        # activate() can raise on Windows even when it succeeded; check below.
        pass
    time.sleep(0.6)
    active = pyautogui.getActiveWindow()
    return bool(active and "WhatsApp" in (active.title or ""))


def send(contact: dict, pyautogui) -> bool:
    url = f"whatsapp://send?phone={contact['phone']}&text={quote(contact['message'], safe='')}"
    # Same as `start "" "whatsapp://..."`, but without cmd.exe mangling & and %.
    os.startfile(url)
    time.sleep(random.uniform(*OPEN_WAIT_SECONDS))

    if not focus_whatsapp(pyautogui):
        print("   ! Окно WhatsApp не стало активным — Enter НЕ нажимаю, пропускаю контакт.")
        return False

    pyautogui.press("enter")
    time.sleep(1.5)
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description="Отправка WhatsApp-сообщений лидам")
    parser.add_argument("--count", type=int, default=5, help="сколько контактов (по умолчанию 5)")
    parser.add_argument("--dry-run", action="store_true", help="только показать список, ничего не отправлять")
    args = parser.parse_args()

    contacts = load_contacts(args.count)
    if not contacts:
        print("Нет контактов для отправки (всем уже отправлено или нет мобильных номеров).")
        return

    print(f"\nКонтакты для отправки ({len(contacts)}):\n")
    for i, c in enumerate(contacts, 1):
        print(f"  {i}. {c['name']:<40} +{c['phone']}")
    print(f"\nПример сообщения:\n  {contacts[0]['message']}\n")

    if args.dry_run:
        print("--dry-run: ничего не отправлено.")
        return

    answer = input("Отправить сообщения этим контактам? (Y/N): ").strip().lower()
    if answer not in ("y", "yes", "д", "да"):
        print("Отменено.")
        return

    pyautogui = ensure_pyautogui()
    pyautogui.FAILSAFE = True  # mouse to a screen corner aborts

    print("\nСтарт. Не трогайте клавиатуру и мышь. Ctrl+C — стоп.\n")
    sent = 0
    for i, c in enumerate(contacts, 1):
        print(f"[{i}/{len(contacts)}] {c['name']} (+{c['phone']})")
        try:
            if send(c, pyautogui):
                mark_contacted(c["phone"], c["name"])
                sent += 1
                print("   ✓ отправлено, номер добавлен в contacted.txt")
        except pyautogui.FailSafeException:
            print("\nОстановлено (fail-safe: мышь в углу экрана).")
            break

        if i < len(contacts):
            pause = random.uniform(*PAUSE_SECONDS)
            print(f"   … пауза {pause:.0f} с")
            time.sleep(pause)

    print(f"\nГотово: отправлено {sent} из {len(contacts)}.")
    print("Обновите список лидов:  node scripts/leads/regenerate.mjs")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nПрервано (Ctrl+C).")
