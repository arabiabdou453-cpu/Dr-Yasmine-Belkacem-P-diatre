"use client";

import { FormEvent, useState } from "react";
import { Icon } from "@/components/icon";

interface AppointmentFormProps {
  readonly compact?: boolean;
}

export function AppointmentForm({ compact = false }: AppointmentFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form
      className={compact ? "appointment-form appointment-form-compact" : "appointment-form"}
      onSubmit={handleSubmit}
    >
      <label>
        <span>Nom complet</span>
        <Icon name="user" size={16} />
        <input name="name" autoComplete="name" required placeholder="Nom complet" />
      </label>
      <label>
        <span>Téléphone</span>
        <Icon name="phone" size={16} />
        <input name="phone" autoComplete="tel" inputMode="tel" required placeholder="Téléphone" />
      </label>
      <label>
        <span>Âge de l’enfant</span>
        <Icon name="age" size={16} />
        <input name="age" inputMode="numeric" required placeholder="Âge de l’enfant" />
      </label>
      <label>
        <span>Motif de consultation</span>
        <Icon name="reason" size={16} />
        <select name="reason" defaultValue="" required>
          <option value="" disabled>
            Motif de consultation
          </option>
          <option value="consultation">Consultation générale</option>
          <option value="growth">Suivi de croissance</option>
          <option value="vaccination">Vaccination</option>
        </select>
      </label>
      <label>
        <span>Date souhaitée</span>
        <Icon name="date" size={16} />
        <input name="date" type="date" aria-label="Choisir une date" required />
      </label>
      <label>
        <span>Heure souhaitée</span>
        <Icon name="time" size={16} />
        <input name="time" type="time" aria-label="Choisir une heure" required />
      </label>
      <button type="submit">
        <Icon name="calendar" size={16} /> Réserver mon rendez-vous
      </button>
      {submitted ? (
        <p className="form-success" role="status">
          Votre demande est prête. Nous vous recontacterons rapidement.
        </p>
      ) : null}
      <p className="form-note">Vos données sont 100% sécurisées et confidentielles.</p>
    </form>
  );
}
