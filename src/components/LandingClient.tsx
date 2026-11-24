"use client";

import { useState, useCallback } from "react";
import { ServiceId, VehicleClassId } from "@/data/studio";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Calculator, CalculationSummary } from "./Calculator";
import { About } from "./About";
import { Reviews } from "./Reviews";
import { BookingForm } from "./BookingForm";
import { Footer } from "./Footer";

export function LandingClient() {
  const [vehicleClass, setVehicleClass] = useState<VehicleClassId>("cd");
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>([
    "onestep",
    "ceramic",
  ]);
  const [lockedCalculation, setLockedCalculation] =
    useState<CalculationSummary | null>(null);

  const handleToggleService = useCallback((serviceId: ServiceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  }, []);

  const handleSelectFromCard = useCallback((serviceId: ServiceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev : [...prev, serviceId]
    );

    const el = document.getElementById("kalkulator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleLockCalculation = useCallback((summary: CalculationSummary) => {
    setLockedCalculation(summary);
    const el = document.getElementById("rezerwacja");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
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
