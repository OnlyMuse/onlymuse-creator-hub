import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  LogOut, 
  Users, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Languages, 
  Target,
  DollarSign,
  Clock,
  Building,
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Lead {
  id: string;
  profile_type: string;
  email: string;
  artistic_name?: string;
  company_name?: string;
  business_type?: string;
  phone?: string;
  country?: string;
  city?: string;
  languages?: string[];
  objectives?: string;
  onlyfans_link?: string;
  experience?: string;
  time_available?: string;
  goals?: string[];
  current_earnings?: string;
  budget?: string;
  contact_preference?: string;
  social_links?: any;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const { admin, logout, isAuthenticated } = useAdmin();
  const { t } = useLanguage();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    models: 0,
    clients: 0,
    today: 0
  });
  const [filterType, setFilterType] = useState<'all' | 'model' | 'client'>('all');
  const [sortNewest, setSortNewest] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchLeads();
  }, [isAuthenticated, navigate]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      if (!admin?.credentials) {
        console.error('Admin credentials not available');
        setIsLoading(false);
        return;
      }

      // Fetch leads using secure admin function
      const { data: leadsData, error: leadsError } = await supabase
        .rpc('get_all_leads_for_admin', {
          admin_email: admin.credentials.email,
          admin_password: admin.credentials.password
        });

      // Fetch stats using secure admin function  
      const { data: statsData, error: statsError } = await supabase
        .rpc('get_lead_stats_for_admin', {
          admin_email: admin.credentials.email,
          admin_password: admin.credentials.password
        });

      if (leadsError) {
        console.error('Error fetching leads:', leadsError);
        return;
      }

      if (statsError) {
        console.error('Error fetching stats:', statsError);
        return;
      }

      if (leadsData) {
        setLeads(leadsData);
      }

      if (statsData && statsData.length > 0) {
        const stat = statsData[0];
        setStats({
          total: Number(stat.total_leads),
          models: Number(stat.model_leads),
          clients: Number(stat.client_leads),
          today: Number(stat.today_leads)
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLead = async (id: string) => {
    if (!window.confirm('¿Eliminar este lead de forma permanente?')) return;
    if (!admin?.credentials) {
      alert('Credenciales admin no disponibles. Inicia sesión de nuevo.');
      return;
    }
    setDeletingId(id);
    try {
  // @ts-expect-error RPC function created in DB but not yet in generated types
  const { error, data } = await supabase.rpc('delete_lead_admin', {
        admin_email: admin.credentials.email,
        admin_password: admin.credentials.password,
        lead_id: id
      });
      if (error) {
        console.error('Error deleting lead via RPC:', error);
        alert('No se pudo eliminar (RPC). Revisa función y políticas.');
        return;
      }
  // We expect the RPC to return { success: boolean }
  if (data && (data as any).success) {
        setLeads(prev => prev.filter(l => l.id !== id));
        setStats(prev => ({
          ...prev,
          total: prev.total - 1,
          models: prev.models - (leads.find(l => l.id === id && l.profile_type === 'model') ? 1 : 0),
          clients: prev.clients - (leads.find(l => l.id === id && l.profile_type === 'client') ? 1 : 0)
        }));
      } else {
        alert('Respuesta inesperada al eliminar.');
      }
    } catch (e) {
      console.error(e);
      alert('Error inesperado al eliminar.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getProfileTypeBadge = (type: string) => {
    return type === 'model' ? (
      <Badge variant="secondary">{t('admin.badge.model')}</Badge>
    ) : (
      <Badge variant="outline">{t('admin.badge.client')}</Badge>
    );
  };

  const filteredLeads = leads
    .filter(l => filterType === 'all' || l.profile_type === filterType)
    .sort((a, b) => sortNewest
      ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      : new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  const exportCSV = () => {
    const rows = [
      ['id','profile_type','email','artistic_name','company_name','country','city','languages','current_earnings','budget','created_at'] as const,
      ...filteredLeads.map(l => [
        l.id,
        l.profile_type,
        l.email,
        l.artistic_name || '',
        l.company_name || '',
        l.country || '',
        l.city || '',
        (l.languages || []).join('|'),
        l.current_earnings || '',
        l.budget || '',
        l.created_at
      ])
    ];
    const csv = rows.map(r => r.map(value => `"${String(value).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{t('admin.title')}</h1>
            <p className="text-muted-foreground">{t('admin.welcome')}, {admin?.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            {t('admin.logout')}
          </Button>
        </div>
      </header>

  <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.stats.total')}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.stats.models')}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.models}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.stats.clients')}</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.clients}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.stats.today')}</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today}</div>
            </CardContent>
          </Card>
        </div>

        {/* Leads Controls + List */}
        <Card>
          <CardHeader className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>{t('admin.leads.title')}</CardTitle>
                <CardDescription>{t('admin.leads.subtitle')}</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant={filterType==='all'? 'default':'outline'} size="sm" onClick={()=>setFilterType('all')}>Todos</Button>
                <Button variant={filterType==='model'? 'default':'outline'} size="sm" onClick={()=>setFilterType('model')}>Modelos</Button>
                <Button variant={filterType==='client'? 'default':'outline'} size="sm" onClick={()=>setFilterType('client')}>Clientes</Button>
                <Button variant="outline" size="sm" onClick={()=>setSortNewest(!sortNewest)}>{sortNewest? 'Más recientes' : 'Más antiguos'}</Button>
                <Button variant="outline" size="sm" onClick={fetchLeads}>Refrescar</Button>
                <Button variant="outline" size="sm" onClick={exportCSV}>Exportar CSV</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">{t('admin.leads.loading')}</div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t('admin.leads.noData')}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="p-6 border rounded-lg space-y-4 relative">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getProfileTypeBadge(lead.profile_type)}
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(lead.created_at), 'dd MMM yyyy, HH:mm', { locale: es })}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg">
                          {lead.profile_type === 'model' 
                            ? lead.artistic_name || 'Sin nombre artístico' 
                            : lead.company_name || 'Sin nombre de empresa'
                          }
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => deleteLead(lead.id)}
                        disabled={deletingId === lead.id}
                        title="Eliminar lead"
                      >
                        {deletingId === lead.id ? (
                          <span className="animate-pulse text-xs">…</span>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lead.email}</span>
                      </div>
                      
                      {lead.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{lead.phone}</span>
                        </div>
                      )}
                      
                      {(lead.country || lead.city) && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {[lead.city, lead.country].filter(Boolean).join(', ')}
                          </span>
                        </div>
                      )}
                      
                      {lead.languages && lead.languages.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Languages className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{lead.languages.join(', ')}</span>
                        </div>
                      )}
                      
                      {lead.current_earnings && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{lead.current_earnings}</span>
                        </div>
                      )}
                      
                      {lead.budget && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{lead.budget}</span>
                        </div>
                      )}
                      
                      {lead.time_available && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{lead.time_available}</span>
                        </div>
                      )}
                    </div>

                    {lead.objectives && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Objetivos:</span>
                        </div>
                        <p className="text-sm text-muted-foreground pl-6">{lead.objectives}</p>
                      </div>
                    )}

                    {lead.goals && lead.goals.length > 0 && (
                      <div>
                        <span className="text-sm font-medium">Metas:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {lead.goals.map((goal, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {goal}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Separator />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;