export type UserTier = "free" | "premium";

export type Platform = "linkedin" | "twitter" | "instagram";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          tier: UserTier;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          tier?: UserTier;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          tier?: UserTier;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      posts_history: {
        Row: {
          id: string;
          user_id: string;
          topic: string;
          generated_content: string;
          platform: Platform;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic: string;
          generated_content: string;
          platform?: Platform;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          topic?: string;
          generated_content?: string;
          platform?: Platform;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_history_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_tier: UserTier;
      platform_type: Platform;
    };
    CompositeTypes: Record<string, never>;
  };
};

export type UserProfile = Database["public"]["Tables"]["users"]["Row"];
export type PostHistory = Database["public"]["Tables"]["posts_history"]["Row"];
