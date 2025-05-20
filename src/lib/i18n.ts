// Define translation type
type Translations = {
  [key: string]: string | { [key: string]: string | { [key: string]: string } };
};

// Define the available languages
export const languages = {
  fr: 'Français',
  en: 'English',
};

// French translations (default)
export const frTranslations: Translations = {
  common: {
    appName: "Ummi's Collection",
    language: "Langue",
    theme: {
      light: "Thème clair",
      dark: "Thème sombre",
    },
    loading: "Chargement...",
    error: "Une erreur est survenue",
    notFound: "Page non trouvée",
  },
  navigation: {
    home: "Accueil",
    products: "Produits",
    contact: "Contact",
    admin: "Admin",
  },
  home: {
    welcome: "Bienvenue chez Ummi's Collection",
    subtitle: "Spécialiste des vêtements féminins à Douala",
    shopNow: "Découvrir",
    featuredProducts: "Produits populaires",
    viewAll: "Voir tout",
  },
  products: {
    title: "Nos produits",
    allCategories: "Toutes les catégories",
    category: {
      abaya: "Abayas",
      jallabiya: "Jallabiyas",
      tshirt: "T-shirts",
      handbag: "Sacs à main",
    },
    loadMore: "Charger plus",
    price: "Prix",
    orderViaWhatsApp: "Commander via WhatsApp",
    currency: "FCFA",
  },
  contact: {
    title: "Contactez-nous",
    subtitle: "Nous sommes à votre disposition pour répondre à vos questions",
    whatsApp: "WhatsApp",
    facebook: "Facebook",
    tiktok: "TikTok",
    location: "Localisation",
    locationDetail: "Douala Kilometers 5",
  },
  admin: {
    login: {
      title: "Connexion Admin",
      email: "Email",
      password: "Mot de passe",
      submit: "Se connecter",
      error: "Email ou mot de passe incorrect",
    },
    dashboard: {
      title: "Tableau de bord",
      welcome: "Bienvenue sur le tableau de bord d'administration",
      logout: "Déconnexion",
    },
    products: {
      title: "Gestion des produits",
      add: "Ajouter un produit",
      edit: "Modifier",
      delete: "Supprimer",
      confirm: "Êtes-vous sûr de vouloir supprimer ce produit ?",
      cancel: "Annuler",
      name: "Nom",
      description: "Description",
      price: "Prix",
      category: "Catégorie",
      image: "Image",
      chooseFile: "Choisir un fichier",
      noFile: "Aucun fichier choisi",
      save: "Enregistrer",
      resetForm: "Réinitialiser",
      validation: {
        nameRequired: "Le nom est requis",
        descriptionRequired: "La description est requise",
        priceRequired: "Le prix est requis",
        priceNumeric: "Le prix doit être un nombre",
        categoryRequired: "La catégorie est requise",
        imageRequired: "L'image est requise",
      },
      success: {
        create: "Produit créé avec succès",
        update: "Produit mis à jour avec succès",
        delete: "Produit supprimé avec succès",
      },
    },
  },
};

// English translations
export const enTranslations: Translations = {
  common: {
    appName: "Ummi's Collection",
    language: "Language",
    theme: {
      light: "Light theme",
      dark: "Dark theme",
    },
    loading: "Loading...",
    error: "An error occurred",
    notFound: "Page not found",
  },
  navigation: {
    home: "Home",
    products: "Products",
    contact: "Contact",
    admin: "Admin",
  },
  home: {
    welcome: "Welcome to Ummi's Collection",
    subtitle: "Specialist in women's clothing in Douala",
    shopNow: "Shop Now",
    featuredProducts: "Featured Products",
    viewAll: "View All",
  },
  products: {
    title: "Our Products",
    allCategories: "All Categories",
    category: {
      abaya: "Abayas",
      jallabiya: "Jallabiyas",
      tshirt: "T-shirts",
      handbag: "Handbags",
    },
    loadMore: "Load More",
    price: "Price",
    orderViaWhatsApp: "Order via WhatsApp",
    currency: "FCFA",
  },
  contact: {
    title: "Contact Us",
    subtitle: "We are at your disposal to answer your questions",
    whatsApp: "WhatsApp",
    facebook: "Facebook",
    tiktok: "TikTok",
    location: "Location",
    locationDetail: "Douala Kilometers 5",
  },
  admin: {
    login: {
      title: "Admin Login",
      email: "Email",
      password: "Password",
      submit: "Login",
      error: "Invalid email or password",
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome to the admin dashboard",
      logout: "Logout",
    },
    products: {
      title: "Product Management",
      add: "Add Product",
      edit: "Edit",
      delete: "Delete",
      confirm: "Are you sure you want to delete this product?",
      cancel: "Cancel",
      name: "Name",
      description: "Description",
      price: "Price",
      category: "Category",
      image: "Image",
      chooseFile: "Choose File",
      noFile: "No file chosen",
      save: "Save",
      resetForm: "Reset",
      validation: {
        nameRequired: "Name is required",
        descriptionRequired: "Description is required",
        priceRequired: "Price is required",
        priceNumeric: "Price must be a number",
        categoryRequired: "Category is required",
        imageRequired: "Image is required",
      },
      success: {
        create: "Product created successfully",
        update: "Product updated successfully",
        delete: "Product deleted successfully",
      },
    },
  },
};

// Store the current language
let currentLanguage = localStorage.getItem('language') || 'fr';

// Get all translations for the current language
export function getTranslations() {
  return currentLanguage === 'fr' ? frTranslations : enTranslations;
}

// Get a specific translation
export function t(key: string): string {
  const keys = key.split('.');
  const translations = getTranslations();
  
  let result: any = translations;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return key; // Return the key if translation is not found
    }
  }
  
  return typeof result === 'string' ? result : key;
}

// Set the current language
export function setLanguage(language: 'fr' | 'en') {
  if (languages[language]) {
    currentLanguage = language;
    localStorage.setItem('language', language);
    
    // Dispatch an event to notify the app that the language has changed
    window.dispatchEvent(new CustomEvent('languageChange', { detail: language }));
    
    // Update the HTML lang attribute
    document.documentElement.lang = language;
  }
}

// Get the current language
export function getLanguage() {
  return currentLanguage;
}

// Initialize the language on page load
export function initializeLanguage() {
  const savedLanguage = localStorage.getItem('language') || 'fr';
  setLanguage(savedLanguage as 'fr' | 'en');
}