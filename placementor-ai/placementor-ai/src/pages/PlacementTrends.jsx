import { useMemo, useState } from "react";
import { IndianRupee, Trophy, GraduationCap, Building2, TrendingUp } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import TrendMetricCard from "../components/TrendMetricCard.jsx";
import TrendFilters from "../components/TrendFilters.jsx";
import AIInsight from "../components/AIInsight.jsx";
import {
  PackageTrendChart,
  PlacementRateChart,
  CompanyHiringChart,
  JobRoleChart,
  PackageByRoleChart,
} from "../components/PlacementCharts.jsx";
import {
  packageTrendData,
  placementRateData,
  roleDistributionData,
  keyMetrics,
  placementInsights,
  careerIntelligenceInsight,
  trendYears,
  trendRoles,
  trendCompanyTypes,
  trendTimeRanges,
  getHiringDataForYear,
  getPackageByRoleForYear,
  getCompaniesHiringForYear,
} from "../data/placementTrendsData.js";
import "./PlacementTrends.css";

const RANGE_LENGTH = { "3y": 3, "5y": 5, all: packageTrendData.length };
const ALL_ROLES = trendRoles[0];

// Phase 4: Placement Trends & Analytics. Everything here reads from
// src/data/placementTrendsData.js — see src/services/api.js
// (getPlacementTrends) for the documented hook a real backend call will
// plug into later.
export default function PlacementTrends() {
  const [year, setYear] = useState(trendYears[0]);
  const [role, setRole] = useState(ALL_ROLES);
  const [companyType, setCompanyType] = useState(trendCompanyTypes[0]);
  const [timeRange, setTimeRange] = useState("5y");

  const rangeLength = RANGE_LENGTH[timeRange] ?? 5;
  const packageTrendSlice = useMemo(() => packageTrendData.slice(-rangeLength), [rangeLength]);
  const placementRateSlice = useMemo(() => placementRateData.slice(-rangeLength), [rangeLength]);

  const hiringData = useMemo(() => {
    const yearly = getHiringDataForYear(year);
    return companyType === "All" ? yearly : yearly.filter((c) => c.type === companyType);
  }, [year, companyType]);

  const packageByRoleForYear = useMemo(() => getPackageByRoleForYear(year), [year]);
  const highlightRole = role === ALL_ROLES ? null : role;

  const averagePackageForYear = useMemo(() => {
    const entry = packageTrendData.find((d) => String(d.year) === String(year));
    return entry ? entry.package : keyMetrics.averagePackage;
  }, [year]);

  const averagePackageDisplay = useMemo(() => {
    if (role !== ALL_ROLES) {
      const roleEntry = packageByRoleForYear.find((r) => r.role === role);
      if (roleEntry) return roleEntry.package;
    }
    return averagePackageForYear;
  }, [role, packageByRoleForYear, averagePackageForYear]);

  const placementRateForYear = useMemo(() => {
    const entry = placementRateData.find((d) => String(d.year) === String(year));
    return entry ? entry.rate : keyMetrics.studentsPlaced;
  }, [year]);

  const companiesHiringForYear = useMemo(() => getCompaniesHiringForYear(year), [year]);

  const growth = useMemo(() => {
    const idx = packageTrendData.findIndex((d) => String(d.year) === String(year));
    if (idx <= 0) return keyMetrics.averagePackageGrowth;
    const curr = packageTrendData[idx].package;
    const prev = packageTrendData[idx - 1].package;
    return Number((((curr - prev) / prev) * 100).toFixed(1));
  }, [year]);

  return (
    <DashboardLayout pageTitle="Placement Trends">
      <div className="trends-content">
        <div className="page-intro">
          <div className="page-intro-badges">
            <span className="badge badge-neutral">Placement Season 2026–27</span>
            <span className="demo-tag">Demo Analytics</span>
          </div>
          <h1>Placement Trends</h1>
          <p>Explore placement trends, company activity and hiring patterns to make better career decisions.</p>
        </div>

        <TrendFilters
          years={trendYears}
          year={year}
          onYearChange={setYear}
          roles={trendRoles}
          role={role}
          onRoleChange={setRole}
          companyTypes={trendCompanyTypes}
          companyType={companyType}
          onCompanyTypeChange={setCompanyType}
          timeRanges={trendTimeRanges}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />

        <div className="trends-metrics">
          <TrendMetricCard
            icon={IndianRupee}
            value={`₹${averagePackageDisplay} LPA`}
            label={role === ALL_ROLES ? "Average Package" : `Avg. Package — ${role}`}
          />
          <TrendMetricCard icon={Trophy} value={`₹${keyMetrics.highestPackage} LPA`} label="Highest Package" />
          <TrendMetricCard icon={GraduationCap} value={`${placementRateForYear}%`} label="Students Placed" />
          <TrendMetricCard icon={Building2} value={companiesHiringForYear} label="Companies Hiring" />
          <TrendMetricCard
            icon={TrendingUp}
            value={`${growth > 0 ? "+" : ""}${growth}%`}
            label="Avg. Package Growth"
            trend="vs. previous year"
            trendDirection={growth >= 0 ? "up" : "down"}
          />
        </div>

        <div className="trends-chart-grid">
          <PackageTrendChart data={packageTrendSlice} />
          <PlacementRateChart data={placementRateSlice} />
        </div>

        <div className="trends-chart-grid">
          <CompanyHiringChart data={hiringData} />
          <JobRoleChart data={roleDistributionData} />
        </div>

        <PackageByRoleChart data={packageByRoleForYear} highlightRole={highlightRole} />

        <section className="card trends-insights-card">
          <div className="card-title-row">
            <h3>Placement Insights</h3>
            <span className="demo-tag">Demo Insights</span>
          </div>
          <div className="trends-insights-grid">
            {placementInsights.map((item) => (
              <div className="trends-insight-item" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <AIInsight title="AI Career Intelligence" text={careerIntelligenceInsight} demoLabel="Demo AI Insight" />
      </div>
    </DashboardLayout>
  );
}
