export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      comment: {
        Row: {
          comment: number | null
          comment_id: number | null
          content: string
          created_at: string
          id: number
          post_id: number | null
          user_id: string
        }
        Insert: {
          comment?: number | null
          comment_id?: number | null
          content: string
          created_at?: string
          id?: number
          post_id?: number | null
          user_id: string
        }
        Update: {
          comment?: number | null
          comment_id?: number | null
          content?: string
          created_at?: string
          id?: number
          post_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_sentence_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      follow: {
        Row: {
          created_at: string
          followed_user_id: string | null
          follower_user_id: string | null
          id: number
        }
        Insert: {
          created_at?: string
          followed_user_id?: string | null
          follower_user_id?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          followed_user_id?: string | null
          follower_user_id?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "follow_followed_user_id_fkey"
            columns: ["followed_user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follow_follower_user_id_fkey"
            columns: ["follower_user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      garden: {
        Row: {
          created_at: string
          id: number
          posts: Json[] | null
          user_id: string
          year_month: string
        }
        Insert: {
          created_at?: string
          id?: number
          posts?: Json[] | null
          user_id: string
          year_month: string
        }
        Update: {
          created_at?: string
          id?: number
          posts?: Json[] | null
          user_id?: string
          year_month?: string
        }
        Relationships: []
      }
      like: {
        Row: {
          created_at: string
          id: number
          post_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "like_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      message: {
        Row: {
          content: string
          created_at: string
          from: string
          id: number
          title: string
          to: string
        }
        Insert: {
          content: string
          created_at?: string
          from: string
          id?: number
          title: string
          to: string
        }
        Update: {
          content?: string
          created_at?: string
          from?: string
          id?: number
          title?: string
          to?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_from_user_id_fkey"
            columns: ["from"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_to_user_id_fkey"
            columns: ["to"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      post: {
        Row: {
          access_type: string | null
          comment: number | null
          content: string
          created_at: string
          emotion_level: string | null
          id: number
          post_type: string
          tags: string[] | null
          title: string | null
          user_id: string
        }
        Insert: {
          access_type?: string | null
          comment?: number | null
          content: string
          created_at?: string
          emotion_level?: string | null
          id?: number
          post_type?: string
          tags?: string[] | null
          title?: string | null
          user_id: string
        }
        Update: {
          access_type?: string | null
          comment?: number | null
          content?: string
          created_at?: string
          emotion_level?: string | null
          id?: number
          post_type?: string
          tags?: string[] | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sentence_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      report: {
        Row: {
          created_at: string
          id: number
          reason: string | null
          reporter_id: string
          target_comment_id: number | null
          target_post_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          reason?: string | null
          reporter_id: string
          target_comment_id?: number | null
          target_post_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          reason?: string | null
          reporter_id?: string
          target_comment_id?: number | null
          target_post_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "report_target_comment_id_fkey"
            columns: ["target_comment_id"]
            isOneToOne: false
            referencedRelation: "comment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_target_id_fkey"
            columns: ["target_post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
        ]
      }
      todo: {
        Row: {
          created_at: string
          folder_id: number
          id: number
          index: number
          is_complete: boolean
          memo: string | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          folder_id: number
          id?: number
          index: number
          is_complete?: boolean
          memo?: string | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          folder_id?: number
          id?: number
          index?: number
          is_complete?: boolean
          memo?: string | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "todo_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      todo_folder: {
        Row: {
          color: string
          created_at: string
          id: number
          index: number
          name: string
          user_id: string
        }
        Insert: {
          color: string
          created_at?: string
          id?: number
          index: number
          name: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: number
          index?: number
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "todo_folder_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      user_info: {
        Row: {
          about_me: string | null
          avatar_url: string | null
          created_at: string
          email: string
          favorite_words: string[] | null
          id: string
          mbti: string | null
          user_name: string | null
        }
        Insert: {
          about_me?: string | null
          avatar_url?: string | null
          created_at?: string
          email: string
          favorite_words?: string[] | null
          id: string
          mbti?: string | null
          user_name?: string | null
        }
        Update: {
          about_me?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string
          favorite_words?: string[] | null
          id?: string
          mbti?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      user_words: {
        Row: {
          created_at: string
          id: number
          user_id: string
          words: Json[] | null
        }
        Insert: {
          created_at?: string
          id?: number
          user_id: string
          words?: Json[] | null
        }
        Update: {
          created_at?: string
          id?: number
          user_id?: string
          words?: Json[] | null
        }
        Relationships: []
      }
      word_dictionary: {
        Row: {
          count: number
          created_at: string
          id: number
          word: string
        }
        Insert: {
          count: number
          created_at?: string
          id?: number
          word: string
        }
        Update: {
          count?: number
          created_at?: string
          id?: number
          word?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
