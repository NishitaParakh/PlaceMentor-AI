import { useState } from "react";
import { Search, Building2 } from "lucide-react";
import EmptyState from "./EmptyState.jsx";
import "./CompanySelector.css";

/**
 * Searchable grid of company cards, shared by the Eligibility Checker and
 * the Company Preparation page.
 *
 * Props:
 * - companies:  array with at least { id, name, role, type }
 * - selectedId: currently selected company id (or null)
 * - onSelect:   called with the company id
 */
export default function CompanySelector({ companies, selectedId, onSelect }) {
  const [search, setSearch] = useState("");

  const filtered = companies.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q);
  });

  return (
    <section className="card company-selector">
      <div className="card-title-row">
        <h3>Select a Company</h3>
        <span className="demo-tag">Sample Company Requirements</span>
      </div>

      <div className="company-search">
        <Search size={16} />
        <label htmlFor="company-search-input" className="sr-only">
          Search companies
        </label>
        <input
          id="company-search-input"
          type="text"
          placeholder="Search companies or roles…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No companies match your search." />
      ) : (
        <div className="company-grid">
          {filtered.map((company) => {
            const isSelected = company.id === selectedId;
            return (
              <div
                key={company.id}
                className={isSelected ? "company-chip company-chip-selected" : "company-chip"}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => onSelect(company.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(company.id);
                  }
                }}
              >
                <div className="company-chip-icon" aria-hidden="true">
                  <Building2 size={18} />
                </div>
                <div className="company-chip-body">
                  <span className="company-chip-name">{company.name}</span>
                  <span className="company-chip-role">{company.role}</span>
                </div>
                <span className="badge badge-low company-chip-type">{company.type}</span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
