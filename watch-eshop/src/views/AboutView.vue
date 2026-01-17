<template>
  <div class="about-view">
    <h1>O nás</h1>

    <div class="about-content">
      <section class="about-section">
        <h2>Vitajte v Clock</h2>
        <p>
          Sme popredný online obchod špecializujúci sa na predaj kvalitných hodiniek 
          od renomovaných značiek. Naša misia je poskytnúť našim zákazníkom najlepší 
          výber luxusných, casual a športových hodiniek za konkurenčné ceny.
        </p>
      </section>

      <section class="about-section">
        <h2>Prečo si vybrať nás?</h2>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">✓</div>
            <h3>Overená kvalita</h3>
            <p>Všetky naše produkty sú 100% originálne a certifikované</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🚚</div>
            <h3>Rýchla doprava</h3>
            <p>Doručenie do 24-48 hodín po celom Slovensku</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🔒</div>
            <h3>Bezpečná platba</h3>
            <p>Vaše údaje sú u nás v bezpečí</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">💬</div>
            <h3>Zákaznícka podpora</h3>
            <p>Tu sme pre vás 24/7</p>
          </div>
        </div>
      </section>

      <section class="about-section">
        <h2>Kontaktujte nás</h2>
        <div class="contact-info">
          <p><strong>Email:</strong> info@clock.sk</p>
          <p><strong>Telefón:</strong> +421 123 456 789</p>
          <p><strong>Adresa:</strong> Levice, Slovensko</p>
        </div>
      </section>

      <section class="about-section tech-info">
        <h2>Technické informácie</h2>
        <p>Tento e-shop bol vytvorený ako školský projekt pre predmet Frontendové technológie.</p>
        <div class="tech-stack">
          <span class="tech-badge">Vue.js 3</span>
          <span class="tech-badge">Vue Router</span>
          <span class="tech-badge">Pinia</span>
          <span class="tech-badge">Options API</span>
          <span class="tech-badge">HTML5</span>
          <span class="tech-badge">CSS3</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about-view {
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #2c3e50;
}

.about-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.about-section {
  margin-bottom: 40px;
}

.about-section:last-child {
  margin-bottom: 0;
}

.about-section h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 3px solid #3498db;
  padding-bottom: 10px;
}

.about-section p {
  line-height: 1.8;
  color: #555;
  font-size: 1.1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
  margin-top: 25px;
}

.feature-item {
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background-color: #f8f9fa;
  transition: transform 0.3s;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.feature-item h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

.feature-item p {
  font-size: 0.95rem;
  color: #666;
}

.contact-info {
  background-color: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  margin-top: 20px;
}

.contact-info p {
  margin-bottom: 12px;
  font-size: 1.05rem;
}

.tech-info {
  background-color: #ecf0f1;
  padding: 25px;
  border-radius: 8px;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.tech-badge {
  background-color: #3498db;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .about-content {
    padding: 20px;
  }

  h1 {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>