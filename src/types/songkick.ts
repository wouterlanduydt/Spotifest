export interface Timestamp {
  date: string;
  datetime?: any;
  time?: any;
}

export interface Identifier {
  mbid: string;
  href: string;
}

export interface Artist {
  id: number;
  displayName: string;
  uri: string;
  identifier: Identifier[];
  onTourUntil?: string | null;
}

export interface Performance {
  id: number;
  displayName: string;
  billing: 'headline' | 'support';
  billingIndex: number;
  artist: Artist;
}

export interface Country {
  displayName: string;
}

export interface MetroArea {
  displayName: string;
  country: Country;
  id: number;
  uri: string;
}

export interface Venue {
  id: number;
  displayName: string;
  uri: string;
  lat: number;
  lng: number;
  metroArea: MetroArea;
}

export interface Location {
  city: string;
  lat: number;
  lng: number;
}

export interface Event {
  id: number;
  type: 'Concert' | 'Festival';
  uri: string;
  displayName: string;
  start: Timestamp;
  end?: Timestamp;
  performance: Performance[];
  ageRestriction?: number | null;
  status: 'ok' | 'cancelled';
  popularity: number;
  flaggedAsEnded: boolean;
  venue: Venue;
  location: Location;
}
