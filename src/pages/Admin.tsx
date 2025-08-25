import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Users, FileText, TrendingUp } from 'lucide-react';

interface Lead {
  id: string;
  profile_type: string;
  email: string;
  artistic_name?: string;
  company_name?: string;
  phone?: string;
  country?: string;
  city?: string;
  created_at: string;
}

interface AdminUser {
  admin_id: string;
  admin_name: string;
  admin_email: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalLeads: 0, modelsCount: 0, clientsCount: 0 });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is already logged in
    const adminData = localStorage.getItem('adminUser');
    if (adminData) {
      setAdminUser(JSON.parse(adminData));
      setIsAuthenticated(true);
      fetchLeads();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.rpc('verify_admin_credentials', {
        input_email: email,
        input_password: password
      });

      if (error || !data || data.length === 0) {
        toast({
          title: "Error de autenticación",
          description: "Credenciales incorrectas",
          variant: "destructive"
        });
        return;
      }

      const admin = data[0];
      setAdminUser(admin);
      setIsAuthenticated(true);
      localStorage.setItem('adminUser', JSON.stringify(admin));
      
      // Update last login
      await supabase.rpc('update_admin_last_login', { admin_id: admin.admin_id });
      
      toast({
        title: "Bienvenido",
        description: `Hola ${admin.admin_name}`,
      });

      fetchLeads();
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al iniciar sesión",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    setAdminUser(null);
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    navigate('/');
  };

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLeads(data || []);
      
      // Calculate stats
      const totalLeads = data?.length || 0;
      const modelsCount = data?.filter(lead => lead.profile_type === 'model').length || 0;
      const clientsCount = data?.filter(lead => lead.profile_type === 'client').length || 0;
      
      setStats({ totalLeads, modelsCount, clientsCount });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al cargar las solicitudes",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Panel de Administrador</CardTitle>
            <CardDescription>Inicia sesión para acceder al dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">Panel de Administrador</h1>
          <p className="text-sm text-muted-foreground">Bienvenido, {adminUser?.admin_name}</p>
        </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Solicitudes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Solicitudes</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalLeads}</div>
                  <p className="text-xs text-muted-foreground">Todas las solicitudes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Modelos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.modelsCount}</div>
                  <p className="text-xs text-muted-foreground">Solicitudes de modelos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.clientsCount}</div>
                  <p className="text-xs text-muted-foreground">Solicitudes de clientes</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Solicitudes Recientes</CardTitle>
                <CardDescription>Las últimas 5 solicitudes recibidas</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.slice(0, 5).map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <Badge variant={lead.profile_type === 'model' ? 'default' : 'secondary'}>
                            {lead.profile_type === 'model' ? 'Modelo' : 'Cliente'}
                          </Badge>
                        </TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.artistic_name || lead.company_name || 'N/A'}</TableCell>
                        <TableCell>{formatDate(lead.created_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Todas las Solicitudes</CardTitle>
                <CardDescription>Lista completa de solicitudes recibidas</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>País</TableHead>
                      <TableHead>Ciudad</TableHead>
                      <TableHead>Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <Badge variant={lead.profile_type === 'model' ? 'default' : 'secondary'}>
                            {lead.profile_type === 'model' ? 'Modelo' : 'Cliente'}
                          </Badge>
                        </TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.artistic_name || lead.company_name || 'N/A'}</TableCell>
                        <TableCell>{lead.phone || 'N/A'}</TableCell>
                        <TableCell>{lead.country || 'N/A'}</TableCell>
                        <TableCell>{lead.city || 'N/A'}</TableCell>
                        <TableCell>{formatDate(lead.created_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;