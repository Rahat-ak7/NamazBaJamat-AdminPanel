export interface Visitor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: {
    coordinates: {
      lat: number;
      lng: number;
    };
    address: string;
  };
  subscriptionStatus: 'subscribed' | 'unsubscribed';
  createdAt: string;
  updatedAt: string;
}

export interface VisitorFilters {
  subscriptionStatus: 'all' | 'subscribed' | 'unsubscribed';
  search: string;
}

export interface VisitorCount {
  totalVisitors: number;
  Subscribed: number;
  Unsubscribed: number;

}
