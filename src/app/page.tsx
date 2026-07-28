import Image from "next/image";
import { AppointmentForm } from "@/components/appointment-form";
import { Icon, type IconName } from "@/components/icon";
import { siteData } from "@/content/site-data";

const trustItems = [
  ["shield", "Soins de qualité", "Approche douce et sécurisée"],
  ["users", "Écoute & Bienveillance", "Notre équipe à l’écoute des enfants et parents"],
  ["clock", "Disponibilité", "Rendez-vous rapides et flexibles"],
  ["heart", "Suivi personnalisé", "Suivi adapté à chaque enfant"],
] as const;

const guarantees = [
  ["shield", "Hygiène & sécurité", "Respect strict des normes d’hygiène."],
  ["users", "Conseils parents", "Conseils pratiques et soutien au quotidien."],
  ["bell", "Rappels de RDV", "Recevez des rappels pour ne rien manquer."],
  ["chat", "Ambiance ludique", "Un environnement chaleureux et rassurant."],
  ["phone", "Urgences 24/7", "Conseils d’urgence disponibles à tout moment."],
] as const;

const statIcons: readonly IconName[] = ["clock", "users", "heart", "calendar", "pin"];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#accueil" aria-label="Dr. Yasmine Belkacem, accueil">
          <span className="brand-icon" aria-hidden="true">
            <Icon name="bear" size={47} />
          </span>
          <span>
            <strong>{siteData.doctor}</strong>
            <small>{siteData.specialty}</small>
            <em>Spécialiste de la santé de l’enfant</em>
          </span>
        </a>
        <nav aria-label="Navigation principale">
          <a href="#accueil">Accueil</a>
          <a href="#apropos">À propos</a>
          <a href="#consultations">Consultations</a>
          <a href="#services">Soins & Services</a>
          <a href="#vaccination">Vaccination</a>
          <a href="#conseils">Conseils parents</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <a className="round-action" href="#contact" aria-label="Nous contacter">
            <Icon name="whatsapp" size={22} />
          </a>
          <a className="header-cta" href="#rendez-vous">
            <Icon name="calendar" size={17} /> Prendre RDV
          </a>
        </div>
      </header>

      <section id="accueil" className="hero">
        <div className="hero-copy">
          <p className="kicker">{siteData.hero.eyebrow}</p>
          <h1>
            Une enfance en bonne <span>santé</span>,<br />
            un avenir <b>heureux</b>
          </h1>
          <p>{siteData.hero.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#rendez-vous">
              <Icon name="calendar" size={16} /> Prendre rendez-vous
            </a>
            <a className="button button-secondary" href="#contact">
              <Icon name="phone" size={16} /> Nous contacter
            </a>
          </div>
          <section className="trust-row" aria-label="Nos engagements">
            {trustItems.map(([icon, title, text]) => (
              <article key={title}>
                <span aria-hidden="true">
                  <Icon name={icon} size={31} />
                </span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
        <div className="hero-media">
          <Image
            src="/images/hero-pediatre.png"
            alt="Pédiatre écoutant une enfant avec un stéthoscope"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 58vw"
          />
          <aside>
            <span className="hero-aside-icon" aria-hidden="true">
              <Icon name="bear" size={49} />
            </span>
            <strong>La santé de votre enfant est entre de bonnes mains</strong>
            <p>De la naissance à l’adolescence, nous sommes là pour chaque étape.</p>
          </aside>
        </div>
      </section>

      <section id="services" className="section services-section">
        <p className="section-kicker">NOS SERVICES</p>
        <h2>
          Des <span>soins complets</span> pour chaque enfant
        </h2>
        <div className="services-grid">
          {siteData.services.map((service) => (
            <article key={service.title}>
              <span aria-hidden="true">
                <Icon name={service.icon} size={38} />
              </span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#rendez-vous">En savoir plus →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="stats-band" aria-label="Chiffres clés">
        {siteData.stats.map((stat, index) => (
          <article key={stat.label}>
            <span aria-hidden="true">
              <Icon name={statIcons[index] ?? "heart"} size={29} />
            </span>
            <div>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="information-grid">
        <article id="apropos" className="about-card">
          <p className="card-title">À propos du {siteData.doctor}</p>
          <div className="about-inner">
            <Image
              src="/images/doctor-pediatre.webp"
              alt="Portrait de la Dr. Yasmine Belkacem"
              width={440}
              height={620}
            />
            <div>
              <p>
                Pédiatre passionnée, j’accompagne vos enfants avec bienveillance et expertise. Mon
                objectif : assurer leur santé et leur épanouissement à chaque étape de leur
                croissance.
              </p>
              <ul>
                <li>Diplôme en Médecine – Université d’Alger</li>
                <li>Spécialisation en Pédiatrie</li>
                <li>Membre de la Société Algérienne de Pédiatrie</li>
                <li>Formations continues internationales</li>
              </ul>
            </div>
          </div>
        </article>
        <article id="rendez-vous" className="booking-card">
          <p className="card-title">Prendre rendez-vous</p>
          <AppointmentForm />
        </article>
        <article id="contact" className="contact-card">
          <p className="card-title">Nos coordonnées</p>
          <div className="contact-list">
            {siteData.contacts.map((contact) => (
              <p key={contact.value}>
                <span aria-hidden="true">
                  <Icon name={contact.icon} size={18} />
                </span>
                <small className={contact.emphasis ? "contact-emphasis" : undefined}>
                  {contact.value}
                </small>
                {contact.secondary ? <strong>{contact.secondary}</strong> : null}
              </p>
            ))}
          </div>
          <div className="map-card">
            <span>
              <Icon name="pin" size={27} />
            </span>
            <strong>
              Cabinet du
              <br />
              Dr. Yasmine Belkacem
            </strong>
            <button type="button">Voir sur la carte</button>
          </div>
        </article>
      </section>

      <section className="clinic-highlight">
        <Image
          src="/images/clinic-pediatre.png"
          alt="Accueil lumineux du cabinet pédiatrique"
          fill
          sizes="100vw"
        />
        <div>
          <p>UN CABINET PENSÉ POUR EUX</p>
          <h2>
            Un environnement rassurant
            <br />
            pour toute la famille.
          </h2>
          <a className="button button-primary" href="#rendez-vous">
            Prendre rendez-vous
          </a>
        </div>
      </section>

      <footer className="guarantee-footer">
        {guarantees.map(([icon, title, text]) => (
          <article key={title}>
            <span aria-hidden="true">
              <Icon name={icon} size={30} />
            </span>
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </footer>
    </main>
  );
}
