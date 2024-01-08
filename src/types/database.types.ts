export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leave_accrued: {
        Row: {
          balance: number
          created_at: string
          duration: number
          id: number
          note: string | null
          org_name: string | null
          policy_id: number
          start_at: string
          user_id: string
        }
        Insert: {
          balance: number
          created_at?: string
          duration?: number
          id?: number
          note?: string | null
          org_name?: string | null
          policy_id: number
          start_at: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          duration?: number
          id?: number
          note?: string | null
          org_name?: string | null
          policy_id?: number
          start_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_accrued_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "leave_accrued_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "leave_policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_accrued_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      leave_categories: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: number
          name: string
          org_name: string | null
          track_time_unit: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: number
          name: string
          org_name?: string | null
          track_time_unit?: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: number
          name?: string
          org_name?: string | null
          track_time_unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_categories_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          }
        ]
      }
      leave_policies: {
        Row: {
          categories_id: number | null
          created_at: string
          description: string | null
          id: number
          name: string
          org_name: string
        }
        Insert: {
          categories_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name: string
          org_name: string
        }
        Update: {
          categories_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          org_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_policies_categories_id_fkey"
            columns: ["categories_id"]
            isOneToOne: false
            referencedRelation: "leave_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_policies_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          }
        ]
      }
      leave_requests: {
        Row: {
          balance: number
          created_at: string
          duration_used: Json[]
          end_at: string
          id: number
          note: string | null
          org_name: string | null
          policy_id: number
          reviewed_at: string | null
          reviewed_by: string | null
          start_at: string
          status: string
          user_id: string
        }
        Insert: {
          balance: number
          created_at?: string
          duration_used: Json[]
          end_at: string
          id?: number
          note?: string | null
          org_name?: string | null
          policy_id: number
          reviewed_at?: string | null
          reviewed_by?: string | null
          start_at: string
          status?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          duration_used?: Json[]
          end_at?: string
          id?: number
          note?: string | null
          org_name?: string | null
          policy_id?: number
          reviewed_at?: string | null
          reviewed_by?: string | null
          start_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_requests_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "leave_requests_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "leave_policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      organizations: {
        Row: {
          country: string
          created_at: string
          employee_count: string
          name: string
        }
        Insert: {
          country: string
          created_at?: string
          employee_count: string
          name: string
        }
        Update: {
          country?: string
          created_at?: string
          employee_count?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          Address: Json | null
          "Basic Information": Json | null
          Bonus: Json[] | null
          Commission: Json[] | null
          Compensation: Json[] | null
          Contact: Json | null
          "Driver License": Json[] | null
          Education: Json[] | null
          "Employment Status": Json[] | null
          Job: Json | null
          "Job Information": Json[] | null
          leave_balance: Json[] | null
          org_name: string
          role: string
          "Social Links": Json | null
          "Stock Options": Json[] | null
          user_id: string
          "Visa Information": Json[] | null
        }
        Insert: {
          Address?: Json | null
          "Basic Information"?: Json | null
          Bonus?: Json[] | null
          Commission?: Json[] | null
          Compensation?: Json[] | null
          Contact?: Json | null
          "Driver License"?: Json[] | null
          Education?: Json[] | null
          "Employment Status"?: Json[] | null
          Job?: Json | null
          "Job Information"?: Json[] | null
          leave_balance?: Json[] | null
          org_name: string
          role: string
          "Social Links"?: Json | null
          "Stock Options"?: Json[] | null
          user_id: string
          "Visa Information"?: Json[] | null
        }
        Update: {
          Address?: Json | null
          "Basic Information"?: Json | null
          Bonus?: Json[] | null
          Commission?: Json[] | null
          Compensation?: Json[] | null
          Contact?: Json | null
          "Driver License"?: Json[] | null
          Education?: Json[] | null
          "Employment Status"?: Json[] | null
          Job?: Json | null
          "Job Information"?: Json[] | null
          leave_balance?: Json[] | null
          org_name?: string
          role?: string
          "Social Links"?: Json | null
          "Stock Options"?: Json[] | null
          user_id?: string
          "Visa Information"?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      settings: {
        Row: {
          org_name: string
          personnal: Json | null
        }
        Insert: {
          org_name: string
          personnal?: Json | null
        }
        Update: {
          org_name?: string
          personnal?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "settings_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          }
        ]
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
