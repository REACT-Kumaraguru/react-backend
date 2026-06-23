import SectionHeader from '../components/SectionHeader.jsx';
import { stakeholders } from '../utils/data.js';

export default function Users() {
  return (
    <section className="section-pad">
      <div className="container mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Stakeholders"
          title="Built for the people who decide what gets planted."
          copy="SeedVision supports farmers, suppliers, institutions, and plantations that need faster, smarter seed decisions."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {stakeholders.map((user) => {
            const Icon = user.icon;
            return (
              <article key={user.title} className="user-card reveal">
                <div><Icon size={26} /></div>
                <h3>{user.title}</h3>
                <p>Practical AI support for higher-confidence planting.</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
