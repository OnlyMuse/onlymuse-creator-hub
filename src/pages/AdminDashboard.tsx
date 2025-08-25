import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
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
  Building
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
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    models: 0,
    clients: 0,
    today: 0
  });
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
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        return;
      }

      if (data) {
        setLeads(data);
        
        // Calculate stats
        const today = new Date().toDateString();
        const todayCount = data.filter(lead => 
          new Date(lead.created_at).toDateString() === today
        ).length;
        
        const modelCount = data.filter(lead => lead.profile_type === 'model').length;
        const clientCount = data.filter(lead => lead.profile_type === 'client').length;
        
        setStats({
          total: data.length,
          models: modelCount,
          clients: clientCount,
          today: todayCount
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getProfileTypeBadge = (type: string) => {
    return type === 'model' ? (
      <Badge variant="secondary">Modelo</Badge>
    ) : (
      <Badge variant="outline">Cliente</Badge>
    );
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
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
            <p className="text-muted-foreground">Bienvenido, {admin?.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Solicitudes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Modelos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.models}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.clients}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today}</div>
            </CardContent>
          </Card>
        </div>

        {/* Leads List */}
        <Card>
          <CardHeader>
            <CardTitle>Solicitudes Recientes</CardTitle>
            <CardDescription>
              Todas las solicitudes recibidas a través del formulario web
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Cargando...</div>
            ) : leads.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No hay solicitudes todavía
              </div>
            ) : (
              <div className="space-y-6">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-6 border rounded-lg space-y-4">
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