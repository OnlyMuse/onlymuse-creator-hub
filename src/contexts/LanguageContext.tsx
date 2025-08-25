import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations = {
  es: {
    // Header
    'header.inicio': 'Inicio',
    'header.servicios': 'Servicios',
    'header.proceso': 'Proceso',
    'header.faq': 'FAQ',
    'header.admin': 'Admin',
    'header.apply': 'Aplicar como Modelo',
    
    // Hero Section
    'hero.title': 'Maximiza tus ganancias en OnlyFans',
    'hero.subtitle': 'Agencia especializada en el crecimiento y optimización de perfiles de OnlyFans. Aumenta tus ingresos con nuestras estrategias probadas.',
    'hero.cta': 'Comenzar Ahora',
    
    // Services
    'services.title': 'Nuestros Servicios',
    'services.subtitle': 'Ofrecemos soluciones completas para maximizar tu éxito en OnlyFans',
    'services.management.title': 'Gestión de Perfil',
    'services.management.desc': 'Optimización completa de tu perfil para atraer más suscriptores y aumentar la retención.',
    'services.marketing.title': 'Marketing Digital',
    'services.marketing.desc': 'Estrategias de promoción en redes sociales para hacer crecer tu audiencia.',
    'services.content.title': 'Estrategia de Contenido',
    'services.content.desc': 'Desarrollo de calendario editorial y estrategias para crear contenido que convierte.',
    'services.analytics.title': 'Análisis y Optimización',
    'services.analytics.desc': 'Seguimiento detallado de métricas y optimización continua de resultados.',
    
    // Process
    'process.title': 'Nuestro Proceso',
    'process.subtitle': 'Un enfoque sistemático para tu éxito',
    'process.step1.title': 'Análisis Inicial',
    'process.step1.desc': 'Evaluamos tu perfil actual y identificamos oportunidades de mejora.',
    'process.step2.title': 'Estrategia Personalizada',
    'process.step2.desc': 'Desarrollamos un plan específico adaptado a tu nicho y objetivos.',
    'process.step3.title': 'Implementación',
    'process.step3.desc': 'Ejecutamos las estrategias y optimizamos tu contenido y presencia.',
    'process.step4.title': 'Monitoreo y Ajuste',
    'process.step4.desc': 'Seguimiento continuo de resultados y ajustes para maximizar el crecimiento.',
    
    // FAQ
    'faq.title': 'Preguntas Frecuentes',
    'faq.subtitle': 'Respuestas a las dudas más comunes',
    'faq.q1': '¿Cuánto tiempo toma ver resultados?',
    'faq.a1': 'Generalmente, los primeros resultados se ven entre 2-4 semanas, pero el crecimiento significativo suele tomar 2-3 meses de trabajo constante.',
    'faq.q2': '¿Qué incluye el servicio de gestión?',
    'faq.a2': 'Incluye optimización de perfil, estrategia de contenido, gestión de mensajes, promoción en redes sociales y análisis de rendimiento.',
    'faq.q3': '¿Trabajan con modelos nuevas?',
    'faq.a3': 'Sí, trabajamos tanto con modelos establecidas como con nuevas. Adaptamos nuestras estrategias según tu nivel de experiencia.',
    'faq.q4': '¿Cómo se estructura el pago?',
    'faq.a4': 'Trabajamos con un modelo de comisión sobre tus ganancias, sin costos iniciales. Solo ganamos cuando tú ganas.',
    
    // Lead Form
    'form.title': 'Únete a OnlyMuse',
    'form.subtitle': 'Completa el formulario y comenzemos a maximizar tus ganancias',
    'form.model': 'Soy Modelo',
    'form.client': 'Soy Cliente',
    'form.email': 'Email',
    'form.email.placeholder': 'tu@email.com',
    'form.artisticName': 'Nombre Artístico',
    'form.artisticName.placeholder': 'Tu nombre artístico',
    'form.companyName': 'Nombre de la Empresa',
    'form.companyName.placeholder': 'Nombre de tu empresa',
    'form.businessType': 'Tipo de Negocio',
    'form.businessType.placeholder': 'Ej: E-commerce, SaaS, etc.',
    'form.phone': 'Teléfono',
    'form.phone.placeholder': '+1 234 567 8900',
    'form.country': 'País',
    'form.country.placeholder': 'Tu país',
    'form.city': 'Ciudad',
    'form.city.placeholder': 'Tu ciudad',
    'form.languages': 'Idiomas',
    'form.languages.placeholder': 'Ej: Español, Inglés',
    'form.objectives': 'Objetivos',
    'form.objectives.placeholder': 'Cuéntanos tus objetivos y metas',
    'form.onlyfansLink': 'Link de OnlyFans',
    'form.onlyfansLink.placeholder': 'https://onlyfans.com/tu-perfil',
    'form.experience': 'Experiencia en OnlyFans',
    'form.experience.beginner': 'Principiante (0-6 meses)',
    'form.experience.intermediate': 'Intermedio (6-18 meses)',
    'form.experience.advanced': 'Avanzado (18+ meses)',
    'form.timeAvailable': 'Tiempo Disponible',
    'form.timeAvailable.partTime': 'Medio tiempo (2-4 horas/día)',
    'form.timeAvailable.fullTime': 'Tiempo completo (6+ horas/día)',
    'form.timeAvailable.casual': 'Casual (1-2 horas/día)',
    'form.goals': 'Metas',
    'form.goals.income': 'Aumentar ingresos',
    'form.goals.subscribers': 'Conseguir más suscriptores',
    'form.goals.content': 'Mejorar calidad del contenido',
    'form.goals.brand': 'Construir marca personal',
    'form.currentEarnings': 'Ganancias Actuales Mensuales',
    'form.currentEarnings.none': 'Sin ganancias aún',
    'form.currentEarnings.low': '$100 - $1,000',
    'form.currentEarnings.medium': '$1,000 - $5,000',
    'form.currentEarnings.high': '$5,000+',
    'form.budget': 'Presupuesto Mensual',
    'form.budget.small': '$500 - $2,000',
    'form.budget.medium': '$2,000 - $10,000',
    'form.budget.large': '$10,000+',
    'form.contactPreference': 'Preferencia de Contacto',
    'form.contactPreference.email': 'Email',
    'form.contactPreference.phone': 'Teléfono',
    'form.contactPreference.whatsapp': 'WhatsApp',
    'form.socialLinks': 'Enlaces de Redes Sociales',
    'form.socialLinks.instagram': 'Instagram',
    'form.socialLinks.twitter': 'Twitter/X',
    'form.socialLinks.tiktok': 'TikTok',
    'form.socialLinks.other': 'Otros',
    'form.submit': 'Enviar Solicitud',
    'form.submitting': 'Enviando...',
    'form.success': '¡Solicitud enviada exitosamente!',
    'form.error': 'Error al enviar la solicitud',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.services': 'Servicios',
    'footer.contact': 'Contacto',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    
    // Admin
    'admin.title': 'Panel de Administración',
    'admin.welcome': 'Bienvenido',
    'admin.logout': 'Cerrar Sesión',
    'admin.login.title': 'Panel de Administración',
    'admin.login.subtitle': 'Accede con tus credenciales de administrador',
    'admin.login.email': 'Email',
    'admin.login.password': 'Contraseña',
    'admin.login.submit': 'Iniciar Sesión',
    'admin.login.submitting': 'Iniciando sesión...',
    'admin.stats.total': 'Total Solicitudes',
    'admin.stats.models': 'Modelos',
    'admin.stats.clients': 'Clientes',
    'admin.stats.today': 'Hoy',
    'admin.leads.title': 'Solicitudes Recientes',
    'admin.leads.subtitle': 'Todas las solicitudes recibidas a través del formulario web',
    'admin.leads.noData': 'No hay solicitudes todavía',
    'admin.leads.loading': 'Cargando...',
    'admin.badge.model': 'Modelo',
    'admin.badge.client': 'Cliente',
  },
  pt: {
    // Header
    'header.inicio': 'Início',
    'header.servicios': 'Serviços',
    'header.proceso': 'Processo',
    'header.faq': 'FAQ',
    'header.admin': 'Admin',
    'header.apply': 'Candidatar-se como Modelo',
    
    // Hero Section
    'hero.title': 'Maximize seus ganhos no OnlyFans',
    'hero.subtitle': 'Agência especializada no crescimento e otimização de perfis do OnlyFans. Aumente sua renda com nossas estratégias comprovadas.',
    'hero.cta': 'Começar Agora',
    
    // Services
    'services.title': 'Nossos Serviços',
    'services.subtitle': 'Oferecemos soluções completas para maximizar seu sucesso no OnlyFans',
    'services.management.title': 'Gestão de Perfil',
    'services.management.desc': 'Otimização completa do seu perfil para atrair mais assinantes e aumentar a retenção.',
    'services.marketing.title': 'Marketing Digital',
    'services.marketing.desc': 'Estratégias de promoção nas redes sociais para fazer crescer seu público.',
    'services.content.title': 'Estratégia de Conteúdo',
    'services.content.desc': 'Desenvolvimento de calendário editorial e estratégias para criar conteúdo que converte.',
    'services.analytics.title': 'Análise e Otimização',
    'services.analytics.desc': 'Acompanhamento detalhado de métricas e otimização contínua de resultados.',
    
    // Process
    'process.title': 'Nosso Processo',
    'process.subtitle': 'Uma abordagem sistemática para seu sucesso',
    'process.step1.title': 'Análise Inicial',
    'process.step1.desc': 'Avaliamos seu perfil atual e identificamos oportunidades de melhoria.',
    'process.step2.title': 'Estratégia Personalizada',
    'process.step2.desc': 'Desenvolvemos um plano específico adaptado ao seu nicho e objetivos.',
    'process.step3.title': 'Implementação',
    'process.step3.desc': 'Executamos as estratégias e otimizamos seu conteúdo e presença.',
    'process.step4.title': 'Monitoramento e Ajuste',
    'process.step4.desc': 'Acompanhamento contínuo de resultados e ajustes para maximizar o crescimento.',
    
    // FAQ
    'faq.title': 'Perguntas Frequentes',
    'faq.subtitle': 'Respostas às dúvidas mais comuns',
    'faq.q1': 'Quanto tempo leva para ver resultados?',
    'faq.a1': 'Geralmente, os primeiros resultados são vistos entre 2-4 semanas, mas o crescimento significativo costuma levar 2-3 meses de trabalho constante.',
    'faq.q2': 'O que inclui o serviço de gestão?',
    'faq.a2': 'Inclui otimização de perfil, estratégia de conteúdo, gestão de mensagens, promoção nas redes sociais e análise de desempenho.',
    'faq.q3': 'Trabalham com modelos iniciantes?',
    'faq.a3': 'Sim, trabalhamos tanto com modelos estabelecidas quanto com iniciantes. Adaptamos nossas estratégias conforme seu nível de experiência.',
    'faq.q4': 'Como é estruturado o pagamento?',
    'faq.a4': 'Trabalhamos com um modelo de comissão sobre seus ganhos, sem custos iniciais. Só ganhamos quando você ganha.',
    
    // Lead Form
    'form.title': 'Junte-se ao OnlyMuse',
    'form.subtitle': 'Complete o formulário e vamos começar a maximizar seus ganhos',
    'form.model': 'Sou Modelo',
    'form.client': 'Sou Cliente',
    'form.email': 'Email',
    'form.email.placeholder': 'seu@email.com',
    'form.artisticName': 'Nome Artístico',
    'form.artisticName.placeholder': 'Seu nome artístico',
    'form.companyName': 'Nome da Empresa',
    'form.companyName.placeholder': 'Nome da sua empresa',
    'form.businessType': 'Tipo de Negócio',
    'form.businessType.placeholder': 'Ex: E-commerce, SaaS, etc.',
    'form.phone': 'Telefone',
    'form.phone.placeholder': '+55 11 99999-9999',
    'form.country': 'País',
    'form.country.placeholder': 'Seu país',
    'form.city': 'Cidade',
    'form.city.placeholder': 'Sua cidade',
    'form.languages': 'Idiomas',
    'form.languages.placeholder': 'Ex: Português, Inglês',
    'form.objectives': 'Objetivos',
    'form.objectives.placeholder': 'Conte-nos seus objetivos e metas',
    'form.onlyfansLink': 'Link do OnlyFans',
    'form.onlyfansLink.placeholder': 'https://onlyfans.com/seu-perfil',
    'form.experience': 'Experiência no OnlyFans',
    'form.experience.beginner': 'Iniciante (0-6 meses)',
    'form.experience.intermediate': 'Intermediário (6-18 meses)',
    'form.experience.advanced': 'Avançado (18+ meses)',
    'form.timeAvailable': 'Tempo Disponível',
    'form.timeAvailable.partTime': 'Meio período (2-4 horas/dia)',
    'form.timeAvailable.fullTime': 'Período integral (6+ horas/dia)',
    'form.timeAvailable.casual': 'Casual (1-2 horas/dia)',
    'form.goals': 'Metas',
    'form.goals.income': 'Aumentar renda',
    'form.goals.subscribers': 'Conseguir mais assinantes',
    'form.goals.content': 'Melhorar qualidade do conteúdo',
    'form.goals.brand': 'Construir marca pessoal',
    'form.currentEarnings': 'Ganhos Atuais Mensais',
    'form.currentEarnings.none': 'Sem ganhos ainda',
    'form.currentEarnings.low': '$100 - $1,000',
    'form.currentEarnings.medium': '$1,000 - $5,000',
    'form.currentEarnings.high': '$5,000+',
    'form.budget': 'Orçamento Mensal',
    'form.budget.small': '$500 - $2,000',
    'form.budget.medium': '$2,000 - $10,000',
    'form.budget.large': '$10,000+',
    'form.contactPreference': 'Preferência de Contato',
    'form.contactPreference.email': 'Email',
    'form.contactPreference.phone': 'Telefone',
    'form.contactPreference.whatsapp': 'WhatsApp',
    'form.socialLinks': 'Links de Redes Sociais',
    'form.socialLinks.instagram': 'Instagram',
    'form.socialLinks.twitter': 'Twitter/X',
    'form.socialLinks.tiktok': 'TikTok',
    'form.socialLinks.other': 'Outros',
    'form.submit': 'Enviar Solicitação',
    'form.submitting': 'Enviando...',
    'form.success': 'Solicitação enviada com sucesso!',
    'form.error': 'Erro ao enviar a solicitação',
    
    // Footer
    'footer.rights': 'Todos os direitos reservados.',
    'footer.services': 'Serviços',
    'footer.contact': 'Contato',
    'footer.privacy': 'Privacidade',
    'footer.terms': 'Termos',
    
    // Admin
    'admin.title': 'Painel de Administração',
    'admin.welcome': 'Bem-vindo',
    'admin.logout': 'Sair',
    'admin.login.title': 'Painel de Administração',
    'admin.login.subtitle': 'Acesse com suas credenciais de administrador',
    'admin.login.email': 'Email',
    'admin.login.password': 'Senha',
    'admin.login.submit': 'Entrar',
    'admin.login.submitting': 'Entrando...',
    'admin.stats.total': 'Total de Solicitações',
    'admin.stats.models': 'Modelos',
    'admin.stats.clients': 'Clientes',
    'admin.stats.today': 'Hoje',
    'admin.leads.title': 'Solicitações Recentes',
    'admin.leads.subtitle': 'Todas as solicitações recebidas através do formulário web',
    'admin.leads.noData': 'Não há solicitações ainda',
    'admin.leads.loading': 'Carregando...',
    'admin.badge.model': 'Modelo',
    'admin.badge.client': 'Cliente',
  },
  en: {
    // Header
    'header.inicio': 'Home',
    'header.servicios': 'Services',
    'header.proceso': 'Process',
    'header.faq': 'FAQ',
    'header.admin': 'Admin',
    'header.apply': 'Apply as Model',
    
    // Hero Section
    'hero.title': 'Maximize your OnlyFans earnings',
    'hero.subtitle': 'Agency specialized in OnlyFans profile growth and optimization. Increase your income with our proven strategies.',
    'hero.cta': 'Start Now',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'We offer complete solutions to maximize your OnlyFans success',
    'services.management.title': 'Profile Management',
    'services.management.desc': 'Complete optimization of your profile to attract more subscribers and increase retention.',
    'services.marketing.title': 'Digital Marketing',
    'services.marketing.desc': 'Social media promotion strategies to grow your audience.',
    'services.content.title': 'Content Strategy',
    'services.content.desc': 'Development of editorial calendar and strategies to create converting content.',
    'services.analytics.title': 'Analytics & Optimization',
    'services.analytics.desc': 'Detailed metrics tracking and continuous optimization of results.',
    
    // Process
    'process.title': 'Our Process',
    'process.subtitle': 'A systematic approach to your success',
    'process.step1.title': 'Initial Analysis',
    'process.step1.desc': 'We evaluate your current profile and identify improvement opportunities.',
    'process.step2.title': 'Custom Strategy',
    'process.step2.desc': 'We develop a specific plan adapted to your niche and goals.',
    'process.step3.title': 'Implementation',
    'process.step3.desc': 'We execute strategies and optimize your content and presence.',
    'process.step4.title': 'Monitor & Adjust',
    'process.step4.desc': 'Continuous results tracking and adjustments to maximize growth.',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Answers to the most common questions',
    'faq.q1': 'How long does it take to see results?',
    'faq.a1': 'Generally, first results are seen within 2-4 weeks, but significant growth usually takes 2-3 months of consistent work.',
    'faq.q2': 'What does the management service include?',
    'faq.a2': 'It includes profile optimization, content strategy, message management, social media promotion, and performance analysis.',
    'faq.q3': 'Do you work with new models?',
    'faq.a3': 'Yes, we work with both established and new models. We adapt our strategies according to your experience level.',
    'faq.q4': 'How is payment structured?',
    'faq.a4': 'We work with a commission model on your earnings, with no upfront costs. We only earn when you earn.',
    
    // Lead Form
    'form.title': 'Join OnlyMuse',
    'form.subtitle': 'Complete the form and let\'s start maximizing your earnings',
    'form.model': 'I\'m a Model',
    'form.client': 'I\'m a Client',
    'form.email': 'Email',
    'form.email.placeholder': 'your@email.com',
    'form.artisticName': 'Artistic Name',
    'form.artisticName.placeholder': 'Your artistic name',
    'form.companyName': 'Company Name',
    'form.companyName.placeholder': 'Your company name',
    'form.businessType': 'Business Type',
    'form.businessType.placeholder': 'Ex: E-commerce, SaaS, etc.',
    'form.phone': 'Phone',
    'form.phone.placeholder': '+1 234 567 8900',
    'form.country': 'Country',
    'form.country.placeholder': 'Your country',
    'form.city': 'City',
    'form.city.placeholder': 'Your city',
    'form.languages': 'Languages',
    'form.languages.placeholder': 'Ex: English, Spanish',
    'form.objectives': 'Objectives',
    'form.objectives.placeholder': 'Tell us your objectives and goals',
    'form.onlyfansLink': 'OnlyFans Link',
    'form.onlyfansLink.placeholder': 'https://onlyfans.com/your-profile',
    'form.experience': 'OnlyFans Experience',
    'form.experience.beginner': 'Beginner (0-6 months)',
    'form.experience.intermediate': 'Intermediate (6-18 months)',
    'form.experience.advanced': 'Advanced (18+ months)',
    'form.timeAvailable': 'Available Time',
    'form.timeAvailable.partTime': 'Part-time (2-4 hours/day)',
    'form.timeAvailable.fullTime': 'Full-time (6+ hours/day)',
    'form.timeAvailable.casual': 'Casual (1-2 hours/day)',
    'form.goals': 'Goals',
    'form.goals.income': 'Increase income',
    'form.goals.subscribers': 'Get more subscribers',
    'form.goals.content': 'Improve content quality',
    'form.goals.brand': 'Build personal brand',
    'form.currentEarnings': 'Current Monthly Earnings',
    'form.currentEarnings.none': 'No earnings yet',
    'form.currentEarnings.low': '$100 - $1,000',
    'form.currentEarnings.medium': '$1,000 - $5,000',
    'form.currentEarnings.high': '$5,000+',
    'form.budget': 'Monthly Budget',
    'form.budget.small': '$500 - $2,000',
    'form.budget.medium': '$2,000 - $10,000',
    'form.budget.large': '$10,000+',
    'form.contactPreference': 'Contact Preference',
    'form.contactPreference.email': 'Email',
    'form.contactPreference.phone': 'Phone',
    'form.contactPreference.whatsapp': 'WhatsApp',
    'form.socialLinks': 'Social Media Links',
    'form.socialLinks.instagram': 'Instagram',
    'form.socialLinks.twitter': 'Twitter/X',
    'form.socialLinks.tiktok': 'TikTok',
    'form.socialLinks.other': 'Others',
    'form.submit': 'Submit Application',
    'form.submitting': 'Submitting...',
    'form.success': 'Application submitted successfully!',
    'form.error': 'Error submitting application',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    
    // Admin
    'admin.title': 'Administration Panel',
    'admin.welcome': 'Welcome',
    'admin.logout': 'Logout',
    'admin.login.title': 'Administration Panel',
    'admin.login.subtitle': 'Access with your administrator credentials',
    'admin.login.email': 'Email',
    'admin.login.password': 'Password',
    'admin.login.submit': 'Sign In',
    'admin.login.submitting': 'Signing in...',
    'admin.stats.total': 'Total Applications',
    'admin.stats.models': 'Models',
    'admin.stats.clients': 'Clients',
    'admin.stats.today': 'Today',
    'admin.leads.title': 'Recent Applications',
    'admin.leads.subtitle': 'All applications received through the web form',
    'admin.leads.noData': 'No applications yet',
    'admin.leads.loading': 'Loading...',
    'admin.badge.model': 'Model',
    'admin.badge.client': 'Client',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    return savedLang || 'es'; // Default to Spanish
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};