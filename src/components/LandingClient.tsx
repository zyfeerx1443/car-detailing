"use client";

import { useState, useCallback } from "react";
import {
  CALCULATOR_SERVICES,
  ServiceId,
  VehicleClassId,
} from "@/data/studio";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Calculator, CalculationSummary } from "./Calculator";
import { About } from "./About";
import { Reviews } from "./Reviews";
import { BookingForm } from "./BookingForm";
import { Footer } from "./Footer";

export function LandingClient() {
  const [vehicleClass, setVehicleClass] = useState<VehicleClassId>("crossover");
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>([
    "ceramic",
    "ppf_front",
  ]);
  const [lockedCalculation, setLockedCalculation] =
    useState<CalculationSummary | null>(null);

  const handleToggleService = useCallback((serviceId: ServiceId) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      }
      const meta = CALCULATOR_SERVICES.find((s) => s.id === serviceId);
      const filtered = meta?.exclusiveWith
        ? prev.filter((id) => id !== meta.exclusiveWith)
        : prev;
      return [...filtered, serviceId];
    });
  }, []);

  const handleSelectFromCard = useCallback((serviceId: ServiceId) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) return prev;
      const meta = CALCULATOR_SERVICES.find((s) => s.id === serviceId);
      const filtered = meta?.exclusiveWith
        ? prev.filter((id) => id !== meta.exclusiveWith)
        : prev;
      return [...filtered, serviceId];
    });

    const el = document.getElementById("calculator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleLockCalculation = useCallback((summary: CalculationSummary) => {
    setLockedCalculation(summary);
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090c] text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <Services
          selectedServices={selectedServices}
          onSelectFromCard={handleSelectFromCard}
        />
        <Calculator
          vehicleClass={vehicleClass}
          selectedServices={selectedServices}
          onChangeVehicleClass={setVehicleClass}
          onToggleService={handleToggleService}
          onReset={() => setSelectedServices([])}
          onLockCalculation={handleLockCalculation}
        />
        <About />
        <Reviews />
        <BookingForm
          lockedCalculation={lockedCalculation}
          onClearCalculation={() => setLockedCalculation(null)}
        />
      </main>
      <Footer />
    </div>
  );
}
