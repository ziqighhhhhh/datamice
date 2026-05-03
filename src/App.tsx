/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CloudUpload, 
  Settings2, 
  CirclePlay, 
  Download, 
  CheckCircle2, 
  Info,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';

// --- Types ---
type ImputationModel = 'BayesianRidge' | 'RandomForest' | 'ExtraTreesRegressor';

// --- Sub-components ---

const Banner = () => (
  <section className="mb-12 bg-brand-teal text-white rounded-xxl p-8 md:p-12 relative overflow-hidden">
    <div className="relative z-10 max-w-2xl">
      <span className="text-xs font-bold uppercase tracking-widest opacity-70 mb-3 block">Core Scientific Principle</span>
      <h1 className="text-4xl md:text-5xl font-medium mb-4 tracking-tight">Preventing Data Leakage</h1>
      <p className="text-lg opacity-90 leading-relaxed max-w-xl">
        Imputation is learned on training data only. MICEFlow ensures the integrity of your experimental design by fitting imputation models exclusively to the training distribution and applying those mappings to test sets.
      </p>
    </div>
    <div className="absolute right-0 top-0 h-full w-1/3 bg-brand-mint/10 backdrop-blur-3xl rounded-l-full hidden xl:block">
      <img 
        className="h-full w-full object-cover mix-blend-overlay"
        alt="A futuristic 3D abstract object representing data"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3ujeJdXsZ99cTLI-pcNYDC5HG2eZrDNxXDxiwc-Ygvz5TW6T2UMl4AerlfM0jnvdi6A2_y7ETMgvImBIy4Mh1TSVD6_CRRTNa5ayrc9TecWHiCcNCMz4qUjxjm6ztlsKzweK7dySWR2PD3e0DyGM9xNhhKW7Odi0cVKrRh6Xpmtw22lnwIZy7r2F4jyl0RVjAz5zVWFi4SuUkgXVQSu8tEvBNvzU2KVxkylV2_1czvbK5EaysgqD-eS2_Bda8_mdalULUUgp6zbY"
      />
    </div>
  </section>
);

const UploadSection = () => (
  <div className="bg-white border border-hairline p-8 rounded-xxl h-full shadow-xs">
    <div className="flex items-center gap-3 mb-6">
      <span className="w-8 h-8 rounded-full bg-brand-lavender/20 text-brand-lavender flex items-center justify-center font-bold">1</span>
      <h2 className="text-xl font-bold text-ink">Upload Dataset</h2>
    </div>
    <div className="border-2 border-dashed border-hairline rounded-xl p-16 flex flex-col items-center justify-center bg-surface-soft hover:border-brand-lavender transition-all cursor-pointer group">
      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
        <CloudUpload className="text-brand-lavender" size={32} />
      </div>
      <p className="text-lg font-semibold text-ink mb-1">Drag and drop files</p>
      <p className="text-sm text-gray-400">Support for CSV, Excel (.xlsx, .xls)</p>
      <button className="mt-8 px-8 py-3 bg-ink text-white rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-sm">
        Select Files
      </button>
    </div>
  </div>
);

const SplittingSection = () => {
  const [ratio, setRatio] = useState(80);
  const [seed, setSeed] = useState(42);
  const [target, setTarget] = useState('Outcome_Variable_Y');

  return (
    <div className="bg-brand-pink text-white p-8 rounded-xxl h-full shadow-xs">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">2</span>
        <h2 className="text-xl font-bold">Data Splitting</h2>
      </div>
      <div className="space-y-8">
        <div>
          <div className="flex justify-between mb-3 text-sm font-medium">
            <span>Train/Test Ratio</span>
            <span className="bg-white/20 px-2 py-0.5 rounded">{ratio}:{100-ratio}</span>
          </div>
          <input 
            type="range" 
            min="50" max="95" 
            value={ratio} 
            onChange={(e) => setRatio(Number(e.target.value))}
            className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Random Seed</label>
          <input 
            type="number" 
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-white placeholder:text-white/50" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Target Variable</label>
          <div className="relative">
            <select 
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-white appearance-none cursor-pointer"
            >
              <option className="text-ink" value="Outcome_Variable_Y">Outcome_Variable_Y</option>
              <option className="text-ink" value="Patient_Survival">Patient_Survival</option>
              <option className="text-ink" value="Price_Prediction">Price_Prediction</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsSection = () => {
  const [iterations, setIterations] = useState(10);
  const [model, setModel] = useState<ImputationModel>('BayesianRidge');
  const [seed, setSeed] = useState(42);

  return (
    <div className="bg-brand-lavender text-brand-teal p-8 rounded-xxl shadow-xs">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-8 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center font-bold">3</span>
        <h2 className="text-xl font-bold">MICE Imputation Settings</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-bold opacity-70 mb-2">Max Iterations</label>
          <input 
            type="number" 
            value={iterations}
            onChange={(e) => setIterations(Number(e.target.value))}
            className="w-full bg-white rounded-xl px-4 py-3 border-none shadow-sm focus:ring-2 focus:ring-brand-teal transition-all outline-none" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold opacity-70 mb-2">Imputation Model</label>
          <div className="relative">
            <select 
              value={model}
              onChange={(e) => setModel(e.target.value as ImputationModel)}
              className="w-full bg-white rounded-xl px-4 py-3 border-none shadow-sm focus:ring-2 focus:ring-brand-teal transition-all outline-none appearance-none cursor-pointer"
            >
              <option>BayesianRidge</option>
              <option>RandomForest</option>
              <option>ExtraTreesRegressor</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40" size={20} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold opacity-70 mb-2">Random Seed</label>
          <input 
            type="number" 
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            className="w-full bg-white rounded-xl px-4 py-3 border-none shadow-sm focus:ring-2 focus:ring-brand-teal transition-all outline-none" 
          />
        </div>
      </div>
      <div className="mt-8 p-4 bg-white/40 rounded-xl flex items-start gap-4 border border-brand-teal/10">
        <Info className="text-brand-teal shrink-0" size={20} />
        <p className="text-sm leading-relaxed">
          Higher iterations improve convergence at the cost of computation time. RandomForest is robust for non-linear relationships.
        </p>
      </div>
    </div>
  );
};

const MetricsSection = () => (
  <div className="bg-white border border-hairline p-8 rounded-xxl shadow-xs">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-brand-mint/30 text-brand-teal flex items-center justify-center font-bold">4</span>
        <h2 className="text-xl font-bold text-ink">Execution Metrics</h2>
      </div>
      <div className="flex items-center gap-2 px-4 py-1.5 bg-brand-mint/20 text-brand-teal rounded-full text-sm font-bold border border-brand-mint/30">
        <CheckCircle2 size={16} />
        <span>Status: Complete</span>
      </div>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        { label: 'Train Missing (Pre)', value: '18.4%', color: 'text-brand-coral' },
        { label: 'Train Missing (Post)', value: '0.0%', color: 'text-brand-teal' },
        { label: 'Test Missing (Pre)', value: '15.2%', color: 'text-brand-coral' },
        { label: 'Test Missing (Post)', value: '0.0%', color: 'text-brand-teal' },
      ].map((metric, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-6 bg-surface-soft rounded-xxl border border-hairline flex flex-col justify-between"
        >
          <p className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">{metric.label}</p>
          <p className={`text-3xl font-bold tracking-tight ${metric.color}`}>{metric.value}</p>
        </motion.div>
      ))}
    </div>

    <div className="overflow-hidden rounded-xl border border-hairline">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-surface-soft border-b border-hairline">
              <th className="px-6 py-4 font-bold text-gray-500">ID</th>
              <th className="px-6 py-4 font-bold text-gray-500">Feature_A (Imputed)</th>
              <th className="px-6 py-4 font-bold text-gray-500">Feature_B</th>
              <th className="px-6 py-4 font-bold text-gray-500">Feature_C (Imputed)</th>
              <th className="px-6 py-4 font-bold text-gray-500">Target</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {[
              { id: '001', a: '24.52', aImp: true, b: '1.203', c: '0.84', cImp: false, t: '1' },
              { id: '002', a: '22.10', aImp: false, b: '0.992', c: '0.77', cImp: true, t: '0' },
              { id: '003', a: '23.15', aImp: false, b: '1.045', c: '0.81', cImp: false, t: '1' },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 1 ? 'bg-surface-soft/30' : 'bg-white'}>
                <td className="px-6 py-4 font-medium">{row.id}</td>
                <td className={`px-6 py-4 ${row.aImp ? 'text-brand-teal font-bold' : ''}`}>
                  {row.a} {row.aImp && <span className="text-[8px] bg-brand-mint px-1 rounded ml-1 leading-none text-brand-teal/80">IMP</span>}
                </td>
                <td className="px-6 py-4">{row.b}</td>
                <td className={`px-6 py-4 ${row.cImp ? 'text-brand-teal font-bold' : ''}`}>
                  {row.c} {row.cImp && <span className="text-[8px] bg-brand-mint px-1 rounded ml-1 leading-none text-brand-teal/80">IMP</span>}
                </td>
                <td className="px-6 py-4">{row.t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ExportSection = () => (
  <div className="bg-brand-mint p-8 rounded-xxl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs">
    <div className="flex items-center gap-5">
      <div className="w-14 h-14 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
        <Download size={28} />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-brand-teal">Ready for Export</h2>
        <p className="text-brand-teal/70 font-medium">All datasets have been fully imputed and validated.</p>
      </div>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button className="bg-white text-brand-teal font-bold px-6 py-4 rounded-xl hover:bg-slate-50 transition-all border border-brand-teal/10 shadow-sm">
        Download Train Set
      </button>
      <button className="bg-white text-brand-teal font-bold px-6 py-4 rounded-xl hover:bg-slate-50 transition-all border border-brand-teal/10 shadow-sm">
        Download Test Set
      </button>
      <button className="bg-brand-teal text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-md active:scale-95">
        Download Combined Dataset
      </button>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen flex flex-col px-4 py-8 md:p-12">
      <main className="w-full max-w-7xl mx-auto space-y-12">
        <Banner />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <UploadSection />
          </div>
          <div className="lg:col-span-5">
            <SplittingSection />
          </div>
        </div>

        <SettingsSection />
        
        <MetricsSection />

        <ExportSection />

        <footer className="pt-12 text-center text-sm text-gray-400 border-t border-hairline mt-12 pb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <LayoutGrid size={16} />
            <span className="font-bold tracking-tight text-gray-500 uppercase text-[10px]">MICEFlow Scientific Lab</span>
          </div>
          <p>© 2024 MICE Imputation Research. Distributed under Apache-2.0 License.</p>
        </footer>
      </main>
    </div>
  );
}
