'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { API_URL } from '@/utils/api';
import {
  LayoutDashboard,
  FolderKanban,
  Zap,
  Mail,
  Star,
  MessageSquare,
  FileText
} from 'lucide-react';

// ─── Auth Hook ─────────────────────────────
function useAdminAuth() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const t = localStorage.getItem('admin_token');
    const a = localStorage.getItem('admin_user');
    if (!t) { router.push('/admin/login'); return; }
    setToken(t);
    if (a) setAdmin(JSON.parse(a));
  }, [router]);

  return { token, admin };
}

// ─── Types ─────────────────────────────────
type TabKey = 'overview' | 'projects' | 'services' | 'messages' | 'testimonials' | 'comments';

// ─── Static chart data ─────────────────────
const activityData = [
  { day: '1', views: 12, messages: 3 }, { day: '3', views: 19, messages: 5 },
  { day: '5', views: 8,  messages: 2 }, { day: '7', views: 25, messages: 7 },
  { day: '9', views: 30, messages: 4 }, { day: '11', views: 22, messages: 6 },
  { day: '13', views: 35, messages: 8 }, { day: '15', views: 42, messages: 10 },
  { day: '17', views: 38, messages: 7 }, { day: '19', views: 28, messages: 5 },
  { day: '21', views: 45, messages: 9 }, { day: '23', views: 50, messages: 12 },
  { day: '25', views: 41, messages: 8 },
];

const donutColors = ['#B1D61E', '#64b5f6', '#ef9a9a'];

// ─── Components ────────────────────────────

function StatCard({ label, value, sub, badge, color, progress }: {
  label: string; value: string | number; sub: string;
  badge: string; color: string; progress: number;
}) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '14px', padding: '22px 24px', position: 'relative',
      backdropFilter: 'blur(12px)', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>{label}</span>
        <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '16px' }}>⋮</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
        <span style={{ background: `${color}22`, color, padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
          {badge}
        </span>
      </div>
      <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#fff', margin: '8px 0 4px' }}>{value}</h2>
      <p style={{ color: color, fontSize: '12px', margin: '0 0 14px' }}>{sub}</p>
      {/* Progress bar */}
      <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${color}, ${color}88)`, borderRadius: '2px' }} />
      </div>
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}>
      <div style={{ background: '#131d14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '36px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', width: '32px', height: '32px', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const inp: React.CSSProperties = { width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box', marginBottom: '14px', fontFamily: "'DM Sans', sans-serif" };
const lbl: React.CSSProperties = { display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '11px', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '6px' };

function ActionBtn({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ padding: '5px 12px', background: `${color}18`, border: `1px solid ${color}40`, borderRadius: '7px', color, cursor: 'pointer', fontSize: '12px', fontFamily: "'DM Sans',sans-serif" }}>
      {label}
    </button>
  );
}

function StatusDot({ status }: { status: string }) {
  const map: Record<string, string> = { new: '#B1D61E', read: '#64b5f6', replied: '#81c784', approved: '#81c784', pending: '#ffc107', published: '#81c784', draft: '#ef9a9a' };
  const c = map[status] || '#aaa';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: `${c}18`, border: `1px solid ${c}40`, color: c, padding: '3px 9px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: c }} />{status}
    </span>
  );
}

// ─── Main Dashboard ────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const { token, admin } = useAdminAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<null | 'project' | 'service'>(null);
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ messages: 0, projects: 0, testimonials: 0, comments: 0, services: 0 });

  const authHeaders = useCallback(() => ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }), [token]);

  // Fetch stats
  useEffect(() => {
    if (!token) return;
    const load = async () => {
      try {
        const [m, p, t, c, s] = await Promise.all([
          fetch(`${API_URL}/contact`, { headers: authHeaders() }).then(r => r.json()),
          fetch(`${API_URL}/projects`).then(r => r.json()),
          fetch(`${API_URL}/testimonials?all=true`).then(r => r.json()),
          fetch(`${API_URL}/comments`, { headers: authHeaders() }).then(r => r.json()),
          fetch(`${API_URL}/services`).then(r => r.json()),
        ]);
        setStats({
          messages: m.data?.length || 0,
          projects: p.data?.length || 0,
          testimonials: t.data?.length || 0,
          comments: c.data?.length || 0,
          services: s.data?.length || 0,
        });
      } catch {}
    };
    load();
  }, [token, authHeaders]);

  // Fetch tab data
  const fetchTab = useCallback(async (tab: TabKey) => {
    if (!token || tab === 'overview') return;
    setLoading(true);
    const eps: Partial<Record<TabKey, string>> = { messages: 'contact', projects: 'projects', testimonials: 'testimonials?all=true', comments: 'comments', services: 'services' };
    try {
      const res = await fetch(`${API_URL}/${eps[tab]}`, { headers: authHeaders() });
      const json = await res.json();
      if (res.ok) setData(json.data || []);
    } catch {}
    setLoading(false);
  }, [token, authHeaders]);

  useEffect(() => { setData([]); fetchTab(activeTab); }, [activeTab, fetchTab]);

  const doDelete = async (id: string, ep: string) => {
    if (!confirm('Delete this item?')) return;
    await fetch(`${API_URL}/${ep}/${id}`, { method: 'DELETE', headers: authHeaders() });
    fetchTab(activeTab);
  };

  const doUpdate = async (id: string, ep: string, body: object) => {
    await fetch(`${API_URL}/${ep}/${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(body) });
    fetchTab(activeTab);
  };

  const doSave = async () => {
    if (!form.title) return;
    setSaving(true);
    const ep = modal === 'project' ? 'projects' : 'services';
    const payload = modal === 'project'
      ? { ...form, technologies: (form.technologiesRaw || '').split(',').map((s: string) => s.trim()).filter(Boolean) }
      : form;
    try {
      await fetch(`${API_URL}/${ep}`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) });
      setModal(null); setForm({});
      fetchTab(modal === 'project' ? 'projects' : 'services');
    } catch {}
    setSaving(false);
  };

  const donutData = [
    { name: 'Projects', value: stats.projects },
    { name: 'Messages', value: stats.messages },
    { name: 'Comments', value: stats.comments },
  ];

  const tabs: { key: TabKey; icon: React.ReactNode; label: string }[] = [
    { key: 'overview', icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
    { key: 'projects', icon: <FolderKanban size={16} />, label: 'Projects' },
    { key: 'services', icon: <Zap size={16} />, label: 'Portfolio' },
    { key: 'messages', icon: <Mail size={16} />, label: 'Messages' },
    { key: 'testimonials', icon: <Star size={16} />, label: 'Testimonials' },
    { key: 'comments', icon: <MessageSquare size={16} />, label: 'Comments' },
  ];

  const cardStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px 22px', marginBottom: '12px' };

  return (
    <div style={{ minHeight: '100vh', background: '#0b1410', fontFamily: "'DM Sans', sans-serif", color: '#fff', display: 'flex', flexDirection: 'column' }}>

      {/* ══ TOPBAR ══════════════════════════════════════════════════════ */}
      <div style={{ height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: 'rgba(0,0,0,0.55)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 200 }}>
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => setSidebarOpen(s => !s)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '20px', padding: '4px 6px' }}>☰</button>
          <span style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>Dashboard</span>
        </div>
        {/* Center: search */}
        <div style={{ flex: 1, maxWidth: '340px', margin: '0 24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', display: 'flex', alignItems: 'center', padding: '6px 14px', gap: '8px' }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>🔍</span>
            <input placeholder="Search something..." style={{ background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: '13px', width: '100%', fontFamily: "'DM Sans', sans-serif" }} />
          </div>
        </div>
        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ color: '#B1D61E', fontSize: '12px', textDecoration: 'none', border: '1px solid rgba(177,214,30,0.3)', padding: '5px 12px', borderRadius: '7px' }}>↗ Site</Link>
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #B1D61E, #82a012)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', color: '#0b1410' }}>
              {(admin?.username?.[0] || 'A').toUpperCase()}
            </div>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{admin?.username || 'Admin'} <span style={{ color: 'rgba(255,255,255,0.3)' }}>▾</span></span>
          </div>
          <button onClick={() => { localStorage.removeItem('admin_token'); localStorage.removeItem('admin_user'); router.push('/admin/login'); }} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '7px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '5px 12px', fontSize: '12px' }}>
            Logout
          </button>
        </div>
      </div>

      {/* ══ BODY ════════════════════════════════════════════════════════ */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── SIDEBAR ─────────────────────────────────────────── */}
        <aside style={{ width: sidebarOpen ? '210px' : '0px', flexShrink: 0, overflow: 'hidden', transition: 'width 0.25s ease', borderRight: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(16px)' }}>
          <div style={{ width: '210px', padding: '20px 0' }}>
            {/* Logo */}
            <div style={{ padding: '0 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#B1D61E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontWeight: 900, fontSize: '14px', color: '#0b1410' }}>iD</span>
                </div>
                <span style={{ fontWeight: 800, fontSize: '16px' }}>im<span style={{ color: '#B1D61E' }}>Dev</span></span>
              </div>
            </div>

            <div style={{ padding: '18px 0 0' }}>
              <p style={{ padding: '0 20px 8px', color: 'rgba(255,255,255,0.25)', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0 }}>MENU</p>
              {tabs.map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                  padding: '10px 20px', background: activeTab === t.key ? 'rgba(177,214,30,0.12)' : 'transparent',
                  borderLeft: activeTab === t.key ? '3px solid #B1D61E' : '3px solid transparent',
                  border: 'none', borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                  borderLeftColor: activeTab === t.key ? '#B1D61E' : 'transparent',
                  borderLeftWidth: '3px', borderLeftStyle: 'solid',
                  color: activeTab === t.key ? '#B1D61E' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', fontSize: '13px', textAlign: 'left',
                  fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s',
                }}>
                  <span style={{ fontSize: '16px' }}>{t.icon}</span>
                  <span style={{ fontWeight: activeTab === t.key ? 600 : 400 }}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── MAIN ─────────────────────────────────────────────── */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px', background: 'radial-gradient(ellipse at 50% 0%, rgba(177,214,30,0.04) 0%, transparent 60%)' }}>

          {/* ══ OVERVIEW TAB ═══════════════════════════════════════ */}
          {activeTab === 'overview' && (
            <>
              {/* Stat Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '20px' }}>
                <StatCard label="Total Messages"  value={stats.messages}     badge={`+${stats.messages}`} color="#B1D61E" sub="Total received" progress={70} />
                <StatCard label="Total Projects"  value={stats.projects}      badge={`${stats.projects}`} color="#64b5f6" sub="In portfolio"   progress={55} />
                <StatCard label="Testimonials"    value={stats.testimonials}  badge={`${stats.testimonials}`} color="#ffc107" sub="Client reviews" progress={40} />
                <StatCard label="Comments"        value={stats.comments}      badge={`${stats.comments}`} color="#ef9a9a" sub="Blog comments"  progress={60} />
              </div>

              {/* Charts row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '14px', marginBottom: '20px' }}>
                {/* Activity Chart */}
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '22px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Site Activity</h3>
                    <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '16px' }}>⋮</button>
                  </div>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={activityData} barGap={4}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: '#131d14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '12px' }} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                      <Bar dataKey="views" fill="#B1D61E" radius={[4, 4, 0, 0]} opacity={0.85} />
                      <Bar dataKey="messages" fill="#64b5f6" radius={[4, 4, 0, 0]} opacity={0.85} />
                      <Line type="monotone" dataKey="views" stroke="#B1D61E" strokeWidth={2} dot={false} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}><span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#B1D61E', display: 'inline-block' }} />Page Views</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}><span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#64b5f6', display: 'inline-block' }} />Messages</span>
                  </div>
                </div>

                {/* Donut Chart */}
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '22px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Content Stats</h3>
                    <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '4px 10px', fontSize: '11px' }}>Refresh ↻</button>
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={donutData} cx="50%" cy="50%" innerRadius={52} outerRadius={80} paddingAngle={3} dataKey="value">
                        {donutData.map((_, i) => <Cell key={i} fill={donutColors[i]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#131d14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                    {donutData.map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: donutColors[i], flexShrink: 0 }} />
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>{d.name}</span>
                        <span style={{ color: '#fff', fontSize: '11px', fontWeight: 600, marginLeft: 'auto' }}>{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '22px 20px' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Quick Actions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
                  {[
                    { label: 'Add Project',   icon: '🗂', color: '#B1D61E',  action: () => { setActiveTab('projects'); setModal('project'); } },
                    { label: 'Add Service',   icon: '⚡', color: '#64b5f6',  action: () => { setActiveTab('services'); setModal('service'); } },
                    { label: 'View Messages', icon: '✉',  color: '#ffc107',  action: () => setActiveTab('messages') },
                    { label: 'Approve Comments', icon: '💬', color: '#ef9a9a', action: () => setActiveTab('comments') },
                  ].map((q, i) => (
                    <button key={i} onClick={q.action} style={{ padding: '14px', background: `${q.color}0d`, border: `1px solid ${q.color}28`, borderRadius: '12px', color: q.color, cursor: 'pointer', textAlign: 'center', fontSize: '13px', fontWeight: 600, fontFamily: "'DM Sans',sans-serif", transition: 'background 0.15s' }}>
                      <div style={{ fontSize: '22px', marginBottom: '6px' }}>{q.icon}</div>
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ══ PROJECTS TAB ════════════════════════════════════════ */}
          {activeTab === 'projects' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800 }}>🗂 Projects</h2>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>Your portfolio works</p>
                </div>
                <button onClick={() => { setForm({ featured: false }); setModal('project'); }} style={{ padding: '10px 20px', background: '#B1D61E', border: 'none', borderRadius: '10px', color: '#0b1410', fontWeight: 700, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  + Add Project
                </button>
              </div>

              {loading && <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.3)' }}>Loading...</div>}
              {!loading && data.length === 0 && (
                <div style={{ textAlign: 'center', padding: '80px', color: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '52px', marginBottom: '12px' }}>🗂</div>
                  <p style={{ fontSize: '16px', margin: '0 0 20px' }}>No projects yet</p>
                  <button onClick={() => { setForm({ featured: false }); setModal('project'); }} style={{ padding: '10px 24px', background: '#B1D61E', border: 'none', borderRadius: '10px', color: '#0b1410', fontWeight: 700, cursor: 'pointer' }}>+ Add Your First Project</button>
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '14px' }}>
                {data.map((p: any) => (
                  <div key={p._id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', overflow: 'hidden' }}>
                    {p.coverImage && <img src={p.coverImage} alt={p.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />}
                    <div style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>{p.title}</h4>
                        {p.featured && <StatusDot status="featured" />}
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: '0 0 10px', lineHeight: 1.5 }}>{p.description?.slice(0, 80)}{p.description?.length > 80 ? '…' : ''}</p>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        {p.technologies?.map((t: string, i: number) => (
                          <span key={i} style={{ padding: '2px 7px', background: 'rgba(177,214,30,0.1)', border: '1px solid rgba(177,214,30,0.2)', borderRadius: '4px', fontSize: '10px', color: '#B1D61E' }}>{t}</span>
                        ))}
                      </div>
                      {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#64b5f6', fontSize: '11px', display: 'block', marginBottom: '12px' }}>↗ {p.liveUrl}</a>}
                      <ActionBtn label="🗑 Delete" color="#ef9a9a" onClick={() => doDelete(p._id, 'projects')} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ══ SERVICES TAB ════════════════════════════════════════ */}
          {activeTab === 'services' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800 }}>⚡ Services</h2>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>Services with image & link</p>
                </div>
                <button onClick={() => { setForm({}); setModal('service'); }} style={{ padding: '10px 20px', background: '#B1D61E', border: 'none', borderRadius: '10px', color: '#0b1410', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}>
                  + Add Service
                </button>
              </div>
              {loading && <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.3)' }}>Loading...</div>}
              {!loading && data.length === 0 && (
                <div style={{ textAlign: 'center', padding: '80px', color: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '52px', marginBottom: '12px' }}>⚡</div>
                  <p style={{ fontSize: '16px', margin: '0 0 20px' }}>No services yet</p>
                  <button onClick={() => { setForm({}); setModal('service'); }} style={{ padding: '10px 24px', background: '#B1D61E', border: 'none', borderRadius: '10px', color: '#0b1410', fontWeight: 700, cursor: 'pointer' }}>+ Add Your First Service</button>
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '14px' }}>
                {data.map((s: any) => (
                  <div key={s._id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', overflow: 'hidden' }}>
                    {s.icon && <img src={s.icon} alt={s.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />}
                    <div style={{ padding: '16px' }}>
                      <h4 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 700 }}>{s.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', margin: '0 0 10px', lineHeight: 1.5 }}>{s.description}</p>
                      {s.link && <a href={s.link} target="_blank" rel="noreferrer" style={{ color: '#64b5f6', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>↗ View Work</a>}
                      <ActionBtn label="🗑 Delete" color="#ef9a9a" onClick={() => doDelete(s._id, 'services')} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ══ MESSAGES TAB ════════════════════════════════════════ */}
          {activeTab === 'messages' && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800 }}>✉ Messages</h2>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>{data.length} submissions received</p>
              </div>
              {loading && <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.3)' }}>Loading...</div>}
              {!loading && data.length === 0 && <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.25)' }}>No messages yet.</div>}
              {data.map((msg: any) => (
                <div key={msg._id} style={cardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <strong style={{ fontSize: '15px' }}>{msg.name}</strong>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginLeft: '10px' }}>{msg.email}</span>
                      {msg.company && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginLeft: '8px' }}>· {msg.company}</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <StatusDot status={msg.status} />
                      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.6, margin: '0 0 14px' }}>{msg.message}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {msg.status !== 'read' && <ActionBtn label="Mark Read" color="#64b5f6" onClick={() => doUpdate(msg._id, 'contact', { status: 'read' })} />}
                    {msg.status !== 'replied' && <ActionBtn label="Mark Replied" color="#81c784" onClick={() => doUpdate(msg._id, 'contact', { status: 'replied' })} />}
                    <ActionBtn label="🗑 Delete" color="#ef9a9a" onClick={() => doDelete(msg._id, 'contact')} />
                  </div>
                </div>
              ))}
            </>
          )}

          {/* ══ TESTIMONIALS TAB ════════════════════════════════════ */}
          {activeTab === 'testimonials' && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800 }}>⭐ Testimonials</h2>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>Client reviews submitted via the site</p>
              </div>
              {loading && <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.3)' }}>Loading...</div>}
              {!loading && data.length === 0 && <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.25)' }}>No testimonials yet.</div>}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '14px' }}>
                {data.map((t: any) => (
                  <div key={t._id} style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '14px' }}>{t.clientName}</strong>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginTop: '2px' }}>{t.email || `${t.position} @ ${t.company}`}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                        <span style={{ color: '#ffc107', fontSize: '14px', letterSpacing: '1px' }}>{'★'.repeat(t.rating)}</span>
                        <StatusDot status={t.approved ? 'approved' : 'pending'} />
                      </div>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 12px' }}>"{t.comment}"</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {!t.approved
                        ? <ActionBtn label="✓ Approve" color="#81c784" onClick={() => doUpdate(t._id, 'testimonials', { approved: true })} />
                        : <ActionBtn label="⏎ Revoke"  color="#ffc107" onClick={() => doUpdate(t._id, 'testimonials', { approved: false })} />
                      }
                      <ActionBtn label="🗑 Delete" color="#ef9a9a" onClick={() => doDelete(t._id, 'testimonials')} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ══ COMMENTS TAB ════════════════════════════════════════ */}
          {activeTab === 'comments' && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800 }}>💬 Comments</h2>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>Approve or remove blog comments</p>
              </div>
              {loading && <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.3)' }}>Loading...</div>}
              {!loading && data.length === 0 && <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.25)' }}>No comments yet.</div>}
              {data.map((c: any) => (
                <div key={c._id} style={cardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <strong style={{ fontSize: '14px' }}>{c.name}</strong>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginLeft: '8px' }}>{c.email}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <StatusDot status={c.approved ? 'approved' : 'pending'} />
                      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.6, margin: '0 0 12px' }}>{c.comment}</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {!c.approved
                      ? <ActionBtn label="✓ Approve" color="#81c784" onClick={() => doUpdate(c._id, 'comments', { approved: true })} />
                      : <ActionBtn label="⏎ Revoke"  color="#ffc107" onClick={() => doUpdate(c._id, 'comments', { approved: false })} />
                    }
                    <ActionBtn label="🗑 Delete" color="#ef9a9a" onClick={() => doDelete(c._id, 'comments')} />
                  </div>
                </div>
              ))}
            </>
          )}



        </main>
      </div>

      {/* ══ ADD PROJECT MODAL ══════════════════════════════════════════ */}
      {modal === 'project' && (
        <Modal title="➕ Add New Project" onClose={() => { setModal(null); setForm({}); }}>
          <label style={lbl}>Project Title *</label>
          <input style={inp} placeholder="e.g. E-commerce Platform" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} />

          <label style={lbl}>Description</label>
          <textarea style={{ ...inp, minHeight: '80px', resize: 'vertical' }} placeholder="What did you build?" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />

          <label style={lbl}>Cover Image URL</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
            <input style={{ ...inp, marginBottom: 0, flex: 1 }} placeholder="https://... or /uploads/image.jpg" value={form.coverImage || ''} onChange={e => setForm({ ...form, coverImage: e.target.value })} />
            <label style={{ background: '#B1D61E', color: '#0b1410', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', whiteSpace: 'nowrap', height: '42px', boxSizing: 'border-box' }}>
              <span>📁 Upload</span>
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const formData = new FormData();
                formData.append('image', file);
                try {
                  const res = await fetch(`${API_URL}/upload`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                  });
                  const resData = await res.json();
                  if (resData.success) {
                    const backendHost = API_URL.replace('/api', '');
                    setForm({ ...form, coverImage: `${backendHost}${resData.data.filePath}` });
                  } else {
                    alert(resData.message || 'Upload failed');
                  }
                } catch (err) {
                  alert('Upload failed');
                }
              }} />
            </label>
          </div>
          {form.coverImage && <img src={form.coverImage} alt="preview" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '14px', border: '1px solid rgba(255,255,255,0.08)' }} onError={e => (e.currentTarget.style.display = 'none')} />}

          <label style={lbl}>Live Project URL ↗</label>
          <input style={inp} placeholder="https://yourproject.com" value={form.liveUrl || ''} onChange={e => setForm({ ...form, liveUrl: e.target.value })} />

          <label style={lbl}>GitHub URL (optional)</label>
          <input style={inp} placeholder="https://github.com/..." value={form.githubUrl || ''} onChange={e => setForm({ ...form, githubUrl: e.target.value })} />

          <label style={lbl}>Technologies (comma separated)</label>
          <input style={inp} placeholder="React, Node.js, MongoDB" value={form.technologiesRaw || ''} onChange={e => setForm({ ...form, technologiesRaw: e.target.value })} />

          <label style={{ ...lbl, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textTransform: 'none', letterSpacing: 0, marginBottom: '20px' }}>
            <input type="checkbox" checked={form.featured || false} onChange={e => setForm({ ...form, featured: e.target.checked })} style={{ accentColor: '#B1D61E', width: '16px', height: '16px' }} />
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px' }}>Mark as Featured</span>
          </label>

          <button onClick={doSave} disabled={saving || !form.title} style={{ width: '100%', padding: '13px', background: saving || !form.title ? 'rgba(177,214,30,0.35)' : '#B1D61E', border: 'none', borderRadius: '10px', color: '#0b1410', fontWeight: 700, cursor: saving || !form.title ? 'not-allowed' : 'pointer', fontSize: '15px', fontFamily: "'DM Sans',sans-serif" }}>
            {saving ? 'Saving…' : '✓ Save Project'}
          </button>
        </Modal>
      )}

      {/* ══ ADD SERVICE MODAL ══════════════════════════════════════════ */}
      {modal === 'service' && (
        <Modal title="➕ Add New Service" onClose={() => { setModal(null); setForm({}); }}>
          <label style={lbl}>Service Title *</label>
          <input style={inp} placeholder="e.g. Web Development" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} />

          <label style={lbl}>Description *</label>
          <textarea style={{ ...inp, minHeight: '80px', resize: 'vertical' }} placeholder="What does this service include?" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />

          <label style={lbl}>Service Image URL</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
            <input style={{ ...inp, marginBottom: 0, flex: 1 }} placeholder="https://... or /uploads/service.jpg" value={form.icon || ''} onChange={e => setForm({ ...form, icon: e.target.value })} />
            <label style={{ background: '#B1D61E', color: '#0b1410', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', whiteSpace: 'nowrap', height: '42px', boxSizing: 'border-box' }}>
              <span>📁 Upload</span>
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const formData = new FormData();
                formData.append('image', file);
                try {
                  const res = await fetch(`${API_URL}/upload`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                  });
                  const resData = await res.json();
                  if (resData.success) {
                    const backendHost = API_URL.replace('/api', '');
                    setForm({ ...form, icon: `${backendHost}${resData.data.filePath}` });
                  } else {
                    alert(resData.message || 'Upload failed');
                  }
                } catch (err) {
                  alert('Upload failed');
                }
              }} />
            </label>
          </div>
          {form.icon && <img src={form.icon} alt="preview" style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '8px', marginBottom: '14px', border: '1px solid rgba(255,255,255,0.08)' }} onError={e => (e.currentTarget.style.display = 'none')} />}

          <label style={lbl}>Link (takes visitor to this work)</label>
          <input style={inp} placeholder="https://example.com or /portfolio-details/..." value={form.link || ''} onChange={e => setForm({ ...form, link: e.target.value })} />

          <button onClick={doSave} disabled={saving || !form.title || !form.description} style={{ width: '100%', padding: '13px', marginTop: '6px', background: saving || !form.title || !form.description ? 'rgba(177,214,30,0.35)' : '#B1D61E', border: 'none', borderRadius: '10px', color: '#0b1410', fontWeight: 700, cursor: 'pointer', fontSize: '15px', fontFamily: "'DM Sans',sans-serif" }}>
            {saving ? 'Saving…' : '✓ Save Service'}
          </button>
        </Modal>
      )}

    </div>
  );
}
