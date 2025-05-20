export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          image_url: string;
          category: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          image_url: string;
          category: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          image_url?: string;
          category?: string;
          created_at?: string;
          updated_at?: string | null;
        };
      };
    };
  };
}