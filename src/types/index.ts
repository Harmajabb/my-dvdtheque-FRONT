// authentification
export interface User {
  id: number;
  nom: string;
  email: string;
}

export interface AuthUser {
    token: string;
    user: User;
}

// Dvds Types
export interface Dvd {
  id: number;
  user_id: number;
  titre: string;
  titre_original?: string;
  realisateur?: string;
  annee?: number;
  duree?: number;
  genre?: string;
  acteurs?: string;
  synopsis?: string;
  image_url?: string;
  emplacement?: string;
  statut: 'en collection' | 'prêté' | 'perdu';
  prete_a?: string;
  date_pret?: string;
  notes_perso?: string;
  date_ajout: string;
  date_modification: string;
}

// types for api responses
export interface DvdListResponse {
  dvds: Dvd[];
  total: number;
  page: number;
  totalPages: number;
}
