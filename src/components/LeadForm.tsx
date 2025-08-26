import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Shield, User, Briefcase, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  isOver18: boolean;
  profileType: 'model' | 'client' | '';
  // Model fields
  artisticName: string;
  email: string;
  country: string;
  city: string;
  languages: string[];
  socialLinks: {
    instagram: string;
    tiktok: string;
    twitter: string;
  };
  onlyFansLink: string;
  experience: string;
  timeAvailable: string;
  goals: string[];
  currentEarnings: string;
  contactPreference: string;
  phone: string;
  // Client fields
  companyName: string;
  businessType: string;
  budget: string;
  objectives: string;
  // Consent
  privacyConsent: boolean;
}

const LeadForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showMoreSocial, setShowMoreSocial] = useState(false);
  const [primaryPlatform, setPrimaryPlatform] = useState<'instagram' | 'tiktok' | 'twitter'>('instagram');
  const AUTOSAVE_KEY = 'leadFormStateV1';
  const [errors, setErrors] = useState<Record<string,string>>({});
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    isOver18: false,
    profileType: '',
    artisticName: '',
    email: '',
    country: '',
    city: '',
    languages: [],
    socialLinks: {
      instagram: '',
      tiktok: '',
      twitter: ''
    },
    onlyFansLink: '',
    experience: '',
    timeAvailable: '',
    goals: [],
    currentEarnings: '',
    contactPreference: '',
    phone: '',
    companyName: '',
    businessType: '',
    budget: '',
    objectives: '',
    privacyConsent: false
  });

  // Pasos simplificados para reducir fricción: 3 en lugar de 4
  const steps = [
    { id: 0, title: "Verificación & Perfil", icon: Shield },
    { id: 1, title: "Información", icon: User },
    { id: 2, title: "Consentimiento", icon: CheckCircle }
  ];

  const countries = [
    "España", "Brasil", "México", "Argentina", "Colombia", "Chile", "Perú", "Venezuela", 
    "Ecuador", "Uruguay", "Paraguay", "Bolivia", "Estados Unidos", "Otro"
  ];

  const languages = [
    "Español", "Inglés", "Francés", "Alemán", "Italiano", "Portugués", "Ruso", "Japonés"
  ];

  const experienceOptions = [
    { value: "none", label: "Sin experiencia" },
    { value: "under-6m", label: "Menos de 6 meses" },
    { value: "6-12m", label: "6-12 meses" },
    { value: "1-2y", label: "1-2 años" },
    { value: "over-2y", label: "Más de 2 años" }
  ];

  const goalOptions = [
    "Aumentar ingresos", "Crecer audiencia", "Mejorar contenido", 
    "Estrategia de marca", "Optimizar tiempo", "Profesionalización"
  ];

  const earningsOptions = [
    { value: "0-500", label: "$0 - $500/mes" },
    { value: "500-2000", label: "$500 - $2,000/mes" },
    { value: "2000-5000", label: "$2,000 - $5,000/mes" },
    { value: "5000-10000", label: "$5,000 - $10,000/mes" },
    { value: "over-10000", label: "Más de $10,000/mes" }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  // Autosave & restore
  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTOSAVE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.formData) {
          setFormData(parsed.formData);
          if (typeof parsed.currentStep === 'number') setCurrentStep(parsed.currentStep);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    const payload = JSON.stringify({ formData, currentStep });
    try { localStorage.setItem(AUTOSAVE_KEY, payload); } catch {}
  }, [formData, currentStep]);

  const clearForm = () => {
    setFormData({
      isOver18: false,
      profileType: '',
      artisticName: '',
      email: '',
      country: '',
      city: '',
      languages: [],
      socialLinks: { instagram: '', tiktok: '', twitter: '' },
      onlyFansLink: '',
      experience: '',
      timeAvailable: '',
      goals: [],
      currentEarnings: '',
      contactPreference: '',
      phone: '',
      companyName: '',
      businessType: '',
      budget: '',
      objectives: '',
      privacyConsent: false
    });
    setCurrentStep(0);
    setShowAdvanced(false);
    try { localStorage.removeItem(AUTOSAVE_KEY); } catch {}
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    setErrors({});
  };

  useEffect(() => {
    // Scroll al inicio del formulario al cambiar de paso para evitar pérdida de contexto
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  const clearError = (name: string) => {
    setErrors(prev => {
      if (!(name in prev)) return prev;
      const { [name]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string,string> = {};
    switch (currentStep) {
      case 0:
        if (!formData.isOver18) newErrors.isOver18 = 'Requerido';
        if (!formData.profileType) newErrors.profileType = 'Selecciona una opción';
        break;
      case 1:
        if (formData.profileType === 'model') {
          if (!formData.artisticName) newErrors.artisticName = 'Obligatorio';
          if (!formData.email) newErrors.email = 'Obligatorio';
          if (!formData.country) newErrors.country = 'Obligatorio';
          const primaryValue = formData.socialLinks[primaryPlatform];
          if (!primaryValue || primaryValue.trim() === '') newErrors.primarySocial = 'Introduce tu usuario o URL';
        } else if (formData.profileType === 'client') {
          if (!formData.companyName) newErrors.companyName = 'Obligatorio';
          if (!formData.email) newErrors.email = 'Obligatorio';
          if (!formData.businessType) newErrors.businessType = 'Obligatorio';
        }
        break;
      case 2:
        if (!formData.privacyConsent) newErrors.privacyConsent = 'Necesario';
        break;
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length) {
      toast({
        title: 'Revisa los campos marcados',
        description: 'Faltan datos obligatorios o hay errores.',
        variant: 'destructive'
      });
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      try {
        // Save to Supabase
        const leadData = {
          profile_type: formData.profileType,
          email: formData.email,
          // Model specific fields
          artistic_name: formData.profileType === 'model' ? formData.artisticName : null,
          country: formData.profileType === 'model' ? formData.country : null,
          city: formData.profileType === 'model' ? formData.city : null,
          languages: formData.profileType === 'model' ? formData.languages : null,
          social_links: formData.profileType === 'model' ? formData.socialLinks : null,
          onlyfans_link: formData.profileType === 'model' ? formData.onlyFansLink || null : null,
          experience: formData.profileType === 'model' ? formData.experience : null,
          time_available: formData.profileType === 'model' ? formData.timeAvailable : null,
          goals: formData.profileType === 'model' ? formData.goals : null,
          current_earnings: formData.profileType === 'model' ? formData.currentEarnings : null,
          contact_preference: formData.profileType === 'model' ? formData.contactPreference : null,
          phone: formData.profileType === 'model' ? formData.phone || null : null,
          // Client specific fields
          company_name: formData.profileType === 'client' ? formData.companyName : null,
          business_type: formData.profileType === 'client' ? formData.businessType : null,
          budget: formData.profileType === 'client' ? formData.budget : null,
          objectives: formData.profileType === 'client' ? formData.objectives : null,
        };

        const { error } = await supabase
          .from('leads')
          .insert([leadData]);

        if (error) {
          throw error;
        }

        toast({
          title: "¡Solicitud enviada con éxito!",
          description: "Te contactaremos en las próximas 24 horas.",
        });

        // Reset form
  clearForm();

      } catch (error) {
        console.error('Error saving lead:', error);
        toast({
          title: "Error al enviar solicitud",
          description: "Hubo un problema. Por favor, intenta de nuevo.",
          variant: "destructive"
        });
      }
    }
  };

  const toggleLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  return (
    <section id="aplicar" className="py-24 bg-gradient-to-br from-background to-primary/5 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              Proceso de Aplicación
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Comienza tu transformación digital
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Completa el formulario (menos de 2 minutos). Solo pedimos lo esencial para darte una respuesta personalizada.
            </p>
          </div>

          <Card ref={cardRef} className="p-8 relative overflow-hidden">
            <button onClick={clearForm} className="absolute top-4 right-4 text-xs text-muted-foreground hover:text-primary underline underline-offset-2">
              Reiniciar
            </button>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2 text-xs font-medium text-muted-foreground">
                <span>Paso {currentStep + 1} de {steps.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="flex justify-between mb-2">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div 
                      key={step.id} 
                      className={`flex flex-col items-center ${
                        index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                        index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        <IconComponent size={16} />
                      </div>
                      <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                    </div>
                  );
                })}
              </div>
              <Progress value={progress} className="h-2" />
            </div>

              {/* Step Content */}
            <div className="space-y-6 min-h-[620px] transition-[min-height] duration-300 ease-in-out">
              {/* Step 0: Age + Profile */}
              {currentStep === 0 && (
                <div className="space-y-8">
                  <div className="text-center space-y-4">
                    <Shield className="w-14 h-14 text-primary mx-auto" />
                    <h3 className="text-2xl font-semibold">Verificación & Tipo de Perfil</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Trabajamos únicamente con mayores de edad y personalizamos la experiencia según tu rol.
                    </p>
                    <div className="flex items-center space-x-2 justify-center">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="over18"
                          checked={formData.isOver18}
                          onCheckedChange={(checked) => {
                            clearError('isOver18');
                            setFormData(prev => ({ ...prev, isOver18: checked as boolean }));
                          }}
                          className={errors.isOver18 ? 'border-destructive data-[state=checked]:bg-destructive' : ''}
                        />
                        <Label htmlFor="over18" className="text-sm font-medium flex items-center gap-2">
                          Confirmo que tengo 18 años o más
                          {errors.isOver18 && <span className="text-destructive text-[10px]">{errors.isOver18}</span>}
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <RadioGroup
                      value={formData.profileType}
                      onValueChange={(value) => 
                        setFormData(prev => ({ ...prev, profileType: value as 'model' | 'client' }))
                    }>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Label htmlFor="model" className="cursor-pointer">
                          <Card className={`p-6 h-full hover:border-primary transition-colors relative ${
                            formData.profileType === 'model' ? 'border-primary bg-primary/5' : ''
                          } ${errors.profileType ? 'border-destructive' : ''}`}>
                            <RadioGroupItem value="model" id="model" className="sr-only" />
                            <User className="w-8 h-8 text-primary mb-3" />
                            <h4 className="font-semibold mb-1">Soy Modelo/Creador(a)</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Quiero crecer en OnlyFans con gestión profesional
                            </p>
                          </Card>
                        </Label>
                        <Label htmlFor="client" className="cursor-pointer">
                          <Card className={`p-6 h-full hover:border-primary transition-colors relative ${
                            formData.profileType === 'client' ? 'border-primary bg-primary/5' : ''
                          } ${errors.profileType ? 'border-destructive' : ''}`}>
                            <RadioGroupItem value="client" id="client" className="sr-only" />
                            <Briefcase className="w-8 h-8 text-primary mb-3" />
                            <h4 className="font-semibold mb-1">Soy Cliente/Empresa</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Busco servicios para modelos o consultoría estratégica
                            </p>
                          </Card>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Step 1: Personal / Business Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-center">
                    {formData.profileType === 'model' ? 'Información del Modelo' : 'Información de la Empresa'}
                  </h3>

                  {formData.profileType === 'model' ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="artisticName">Nombre Artístico *</Label>
                          <Input
                            id="artisticName"
                            value={formData.artisticName}
                            onChange={(e) => { clearError('artisticName'); setFormData(prev => ({ ...prev, artisticName: e.target.value })); }}
                            placeholder="Tu nombre artístico"
                            className={errors.artisticName ? 'border-destructive focus-visible:ring-destructive' : ''}
                          />
                          {errors.artisticName && <p className="mt-1 text-xs text-destructive">{errors.artisticName}</p>}
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => { clearError('email'); setFormData(prev => ({ ...prev, email: e.target.value })); }}
                            placeholder="tu@email.com"
                            className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                          />
                          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="country">País *</Label>
                          <Select value={formData.country} onValueChange={(value) => {
                            clearError('country');
                            setFormData(prev => ({ ...prev, country: value }));
                          }}>
                            <SelectTrigger className={errors.country ? 'border-destructive focus:ring-destructive' : ''}>
                              <SelectValue placeholder="Selecciona tu país" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>{country}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.country && <p className="mt-1 text-xs text-destructive">{errors.country}</p>}
                        </div>
                        <div>
                          <Label htmlFor="city">Ciudad</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                            placeholder="Tu ciudad"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Idiomas que hablas</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                          {languages.map((language) => (
                            <Label key={language} className="flex items-center space-x-2 cursor-pointer">
                              <Checkbox
                                checked={formData.languages.includes(language)}
                                onCheckedChange={() => toggleLanguage(language)}
                              />
                              <span className="text-sm">{language}</span>
                            </Label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">Red Social Principal <span className="text-xs text-muted-foreground font-normal">(obligatoria)</span></Label>
                          <div className="grid grid-cols-3 gap-2">
                            {(['instagram','tiktok','twitter'] as const).map(p => (
                              <button
                                key={p}
                                type="button"
                                onClick={() => setPrimaryPlatform(p)}
                                className={`text-xs rounded-md border px-2 py-1.5 capitalize transition-colors ${primaryPlatform===p? 'bg-primary text-primary-foreground border-primary':'hover:border-primary/50'}`}
                              >
                                {p === 'twitter' ? 'X/Twitter' : p}
                              </button>
                            ))}
                          </div>
                          <Input
                            value={formData.socialLinks[primaryPlatform]}
                            onChange={(e) => { clearError('primarySocial'); setFormData(prev => ({
                              ...prev,
                              socialLinks: { ...prev.socialLinks, [primaryPlatform]: e.target.value }
                            })); }}
                            placeholder={`URL o usuario de ${primaryPlatform==='twitter'?'X/Twitter':primaryPlatform}`}
                            className={errors.primarySocial ? 'border-destructive focus-visible:ring-destructive' : ''}
                          />
                          {errors.primarySocial && <p className="mt-1 text-xs text-destructive">{errors.primarySocial}</p>}
                          <p className="text-[11px] text-muted-foreground">Solo necesitamos una red para validar tu presencia. Puedes añadir más si quieres.</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => setShowMoreSocial(s=>!s)}
                            className="text-xs font-medium text-primary hover:underline"
                          >
                            {showMoreSocial ? 'Ocultar redes adicionales' : 'Añadir redes adicionales (opcional)'}
                          </button>
                          {showMoreSocial && (
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in-50">
                              {(['instagram','tiktok','twitter'] as const).filter(p=>p!==primaryPlatform).map(p => (
                                <div key={p} className="space-y-1">
                                  <Label htmlFor={`extra-${p}`} className="text-[11px] text-muted-foreground">{p==='twitter'?'X/Twitter':p}</Label>
                                  <Input
                                    id={`extra-${p}`}
                                    value={formData.socialLinks[p]}
                                    onChange={(e) => setFormData(prev => ({
                                      ...prev,
                                      socialLinks: { ...prev.socialLinks, [p]: e.target.value }
                                    }))}
                                    placeholder={p==='twitter'? 'https://twitter.com/usuario' : `https://${p}.com/usuario`}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="onlyFans">OnlyFans (opcional)</Label>
                        <Input
                          id="onlyFans"
                          value={formData.onlyFansLink}
                          onChange={(e) => setFormData(prev => ({ ...prev, onlyFansLink: e.target.value }))}
                          placeholder="https://onlyfans.com/tu-usuario"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="experience">Experiencia en OnlyFans</Label>
                          <Select value={formData.experience} onValueChange={(value) => 
                            setFormData(prev => ({ ...prev, experience: value }))
                          }>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu experiencia" />
                            </SelectTrigger>
                            <SelectContent>
                              {experienceOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="currentEarnings">Ingresos actuales (opcional)</Label>
                          <Select value={formData.currentEarnings} onValueChange={(value) => 
                            setFormData(prev => ({ ...prev, currentEarnings: value }))
                          }>
                            <SelectTrigger>
                              <SelectValue placeholder="Rango de ingresos" />
                            </SelectTrigger>
                            <SelectContent>
                              {earningsOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAdvanced(s => !s)}
                          className="text-xs font-medium text-primary hover:underline"
                        >
                          {showAdvanced ? 'Ocultar detalles opcionales' : 'Mostrar detalles opcionales'}
                        </button>
                        {showAdvanced && (
                          <div className="mt-4 space-y-6 animate-in fade-in-50">
                            <div>
                              <Label>Objetivos principales (selecciona todos los que apliquen)</Label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                {goalOptions.map((goal) => (
                                  <Label key={goal} className="flex items-center space-x-2 cursor-pointer">
                                    <Checkbox
                                      checked={formData.goals.includes(goal)}
                                      onCheckedChange={() => toggleGoal(goal)}
                                    />
                                    <span className="text-sm">{goal}</span>
                                  </Label>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end">
                        {formData.profileType && (
                          <Button
                            type="button"
                            variant="secondary"
                            className="mt-2"
                            onClick={() => { setCurrentStep(2); }}
                          >
                            Ir a Consentimiento
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Client form
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="companyName">Nombre de la Empresa *</Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                            placeholder="Nombre de tu empresa"
                          />
                        </div>
                        <div>
                          <Label htmlFor="clientEmail">Email *</Label>
                          <Input
                            id="clientEmail"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="email@empresa.com"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="businessType">Tipo de Negocio *</Label>
                        <Input
                          id="businessType"
                          value={formData.businessType}
                          onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                          placeholder="Ej: Agencia de marketing, Productora de contenido, etc."
                        />
                      </div>

                      <div>
                        <Label htmlFor="budget">Presupuesto Mensual</Label>
                        <Select value={formData.budget} onValueChange={(value) => 
                          setFormData(prev => ({ ...prev, budget: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu rango de presupuesto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-5k">Menos de $5,000</SelectItem>
                            <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                            <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                            <SelectItem value="over-50k">Más de $50,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="objectives">Objetivos y Necesidades</Label>
                        <Textarea
                          id="objectives"
                          value={formData.objectives}
                          onChange={(e) => setFormData(prev => ({ ...prev, objectives: e.target.value }))}
                          placeholder="Describe qué servicios necesitas y cuáles son tus objetivos..."
                          rows={4}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Consent */}
              {currentStep === 2 && (
                <div className="text-center space-y-6">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto" />
                  <h3 className="text-2xl font-semibold">Consentimientos Finales</h3>
                  <div className="space-y-4 text-left">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="privacy"
                        checked={formData.privacyConsent}
                        onCheckedChange={(checked) => {
                          clearError('privacyConsent');
                          setFormData(prev => ({ ...prev, privacyConsent: checked as boolean }));
                        }}
                        className={errors.privacyConsent ? 'border-destructive data-[state=checked]:bg-destructive' : ''}
                      />
                      <div>
                        <Label htmlFor="privacy" className="text-base font-medium">
                          Acepto la política de privacidad y el tratamiento de datos *
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Tus datos serán tratados de forma confidencial y únicamente para proporcionarte 
                          los servicios solicitados. Puedes solicitar su eliminación en cualquier momento.
                        </p>
                        {errors.privacyConsent && <p className="mt-2 text-xs text-destructive">{errors.privacyConsent}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-lg text-sm text-muted-foreground">
                    <p className="font-medium mb-2">Próximos pasos:</p>
                    <ul className="text-left space-y-1">
                      <li>• Recibirás un email de confirmación inmediatamente</li>
                      <li>• Nuestro equipo revisará tu aplicación en 24-48 horas</li>
                      <li>• Te contactaremos para agendar una consulta gratuita</li>
                      <li>• Desarrollaremos una estrategia personalizada para ti</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t sticky bottom-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Anterior
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button onClick={nextStep} className="flex items-center gap-2">
                  Siguiente
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="flex items-center gap-2 bg-success hover:bg-success/90">
                  Enviar Aplicación
                  <CheckCircle size={16} />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;