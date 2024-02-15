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
      candidate_comments: {
        Row: {
          Author_picture: string | null
          candidate_id: number | null
          comment_Author: string | null
          comment_content: string | null
          created_at: string
          id: number
          org_name: string | null
          reply_id: number | null
        }
        Insert: {
          Author_picture?: string | null
          candidate_id?: number | null
          comment_Author?: string | null
          comment_content?: string | null
          created_at?: string
          id?: number
          org_name?: string | null
          reply_id?: number | null
        }
        Update: {
          Author_picture?: string | null
          candidate_id?: number | null
          comment_Author?: string | null
          comment_content?: string | null
          created_at?: string
          id?: number
          org_name?: string | null
          reply_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_comments_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_comments_comment_Author_fkey"
            columns: ["comment_Author"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "candidate_comments_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "candidate_comments_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "candidate_comments"
            referencedColumns: ["id"]
          }
        ]
      }
      candidate_emails: {
        Row: {
          candidate_receiver: number | null
          created_at: string
          email: string | null
          email_object: string | null
          id: number
          user_sender: string | null
        }
        Insert: {
          candidate_receiver?: number | null
          created_at?: string
          email?: string | null
          email_object?: string | null
          id?: number
          user_sender?: string | null
        }
        Update: {
          candidate_receiver?: number | null
          created_at?: string
          email?: string | null
          email_object?: string | null
          id?: number
          user_sender?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_emails_candidate_receiver_fkey"
            columns: ["candidate_receiver"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_emails_user_sender_fkey"
            columns: ["user_sender"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      candidates: {
        Row: {
          created_at: string
          Email: string | null
          email_history: Json[] | null
          "First Name": string | null
          "Hiring Lead": string | null
          id: number
          job_id: number | null
          "Last Name": string | null
          metadata: Json | null
          org_name: string | null
          Phone: string | null
          Questions: Json | null
          Ratings: number | null
          status: string | null
        }
        Insert: {
          created_at?: string
          Email?: string | null
          email_history?: Json[] | null
          "First Name"?: string | null
          "Hiring Lead"?: string | null
          id?: number
          job_id?: number | null
          "Last Name"?: string | null
          metadata?: Json | null
          org_name?: string | null
          Phone?: string | null
          Questions?: Json | null
          Ratings?: number | null
          status?: string | null
        }
        Update: {
          created_at?: string
          Email?: string | null
          email_history?: Json[] | null
          "First Name"?: string | null
          "Hiring Lead"?: string | null
          id?: number
          job_id?: number | null
          "Last Name"?: string | null
          metadata?: Json | null
          org_name?: string | null
          Phone?: string | null
          Questions?: Json | null
          Ratings?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "Hiring"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidates_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          }
        ]
      }
      divisions: {
        Row: {
          created_at: string
          id: number
          name: string
          org_name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          org_name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          org_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "divisions_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          }
        ]
      }
      files: {
        Row: {
          addedBy: string | null
          created_at: string
          file_type: string | null
          file_url: string | null
          folderId: number | null
          id: number
          name: string | null
          org_name: string | null
          size: number | null
        }
        Insert: {
          addedBy?: string | null
          created_at?: string
          file_type?: string | null
          file_url?: string | null
          folderId?: number | null
          id?: number
          name?: string | null
          org_name?: string | null
          size?: number | null
        }
        Update: {
          addedBy?: string | null
          created_at?: string
          file_type?: string | null
          file_url?: string | null
          folderId?: number | null
          id?: number
          name?: string | null
          org_name?: string | null
          size?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "files_addedBy_fkey"
            columns: ["addedBy"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "files_folderId_fkey"
            columns: ["folderId"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          }
        ]
      }
      folders: {
        Row: {
          created_at: string
          id: number
          name: string
          org_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          org_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          org_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "folders_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          }
        ]
      }
      Hiring: {
        Row: {
          Application_Details: Json | null
          created_at: string
          Form: Json | null
          id: number
          "Job Status": string | null
          job_Boards: Json | null
          job_information: Json | null
          org_name: string | null
          Questions: Json | null
        }
        Insert: {
          Application_Details?: Json | null
          created_at?: string
          Form?: Json | null
          id?: number
          "Job Status"?: string | null
          job_Boards?: Json | null
          job_information?: Json | null
          org_name?: string | null
          Questions?: Json | null
        }
        Update: {
          Application_Details?: Json | null
          created_at?: string
          Form?: Json | null
          id?: number
          "Job Status"?: string | null
          job_Boards?: Json | null
          job_information?: Json | null
          org_name?: string | null
          Questions?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "Hiring_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          }
        ]
      }
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
      leave_balance: {
        Row: {
          balance: number
          categories_id: number
          created_at: string
          org_name: string
          policy_id: number
          status: string
          user_id: string
        }
        Insert: {
          balance?: number
          categories_id: number
          created_at?: string
          org_name: string
          policy_id: number
          status?: string
          user_id: string
        }
        Update: {
          balance?: number
          categories_id?: number
          created_at?: string
          org_name?: string
          policy_id?: number
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_balance_categories_id_fkey"
            columns: ["categories_id"]
            isOneToOne: false
            referencedRelation: "leave_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_balance_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "leave_balance_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "leave_policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_balance_user_id_fkey"
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
          disabled: boolean
          icon: string
          id: number
          name: string
          org_name: string
          paid: boolean
          track_time_unit: string
        }
        Insert: {
          color?: string
          created_at?: string
          disabled?: boolean
          icon: string
          id?: number
          name: string
          org_name: string
          paid?: boolean
          track_time_unit?: string
        }
        Update: {
          color?: string
          created_at?: string
          disabled?: boolean
          icon?: string
          id?: number
          name?: string
          org_name?: string
          paid?: boolean
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
          accrual_days: string[] | null
          accrual_value_in_hours: number
          categories_id: number
          created_at: string
          id: number
          name: string
          org_name: string
          type: Database["public"]["Enums"]["database_leave_policies_policy_type"]
        }
        Insert: {
          accrual_days?: string[] | null
          accrual_value_in_hours?: number
          categories_id: number
          created_at?: string
          id?: number
          name: string
          org_name: string
          type?: Database["public"]["Enums"]["database_leave_policies_policy_type"]
        }
        Update: {
          accrual_days?: string[] | null
          accrual_value_in_hours?: number
          categories_id?: number
          created_at?: string
          id?: number
          name?: string
          org_name?: string
          type?: Database["public"]["Enums"]["database_leave_policies_policy_type"]
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
          reviewed_comment: string | null
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
          reviewed_comment?: string | null
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
          reviewed_comment?: string | null
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
      notifications: {
        Row: {
          created_at: string
          description: string
          id: number
          message: string
          org_name: string
          status:
            | Database["public"]["Enums"]["leave_request_status_type"]
            | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          message: string
          org_name: string
          status?:
            | Database["public"]["Enums"]["leave_request_status_type"]
            | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          message?: string
          org_name?: string
          status?:
            | Database["public"]["Enums"]["leave_request_status_type"]
            | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_notfications_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "public_notfications_user_id_fkey"
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
      permissions: {
        Row: {
          created_at: string
          files_ids: number[] | null
          org_name: string
          role_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          files_ids?: number[] | null
          org_name: string
          role_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          files_ids?: number[] | null
          org_name?: string
          role_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "permissions_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          accrual_start_date: string | null
          Address: Json | null
          "Basic Information": Json | null
          Bonus: Json[] | null
          Commission: Json[] | null
          Compensation: Json[] | null
          Contact: Json | null
          "Driver License": Json[] | null
          Education: Json[] | null
          "Employment Status": Json[] | null
          Hiring: Json | null
          Job: Json | null
          "Job Information": Json[] | null
          org_name: string
          picture: string | null
          "Social Links": Json | null
          "Stock Options": Json[] | null
          supervisor_id: string | null
          user_id: string
          "Visa Information": Json[] | null
        }
        Insert: {
          accrual_start_date?: string | null
          Address?: Json | null
          "Basic Information"?: Json | null
          Bonus?: Json[] | null
          Commission?: Json[] | null
          Compensation?: Json[] | null
          Contact?: Json | null
          "Driver License"?: Json[] | null
          Education?: Json[] | null
          "Employment Status"?: Json[] | null
          Hiring?: Json | null
          Job?: Json | null
          "Job Information"?: Json[] | null
          org_name: string
          picture?: string | null
          "Social Links"?: Json | null
          "Stock Options"?: Json[] | null
          supervisor_id?: string | null
          user_id: string
          "Visa Information"?: Json[] | null
        }
        Update: {
          accrual_start_date?: string | null
          Address?: Json | null
          "Basic Information"?: Json | null
          Bonus?: Json[] | null
          Commission?: Json[] | null
          Compensation?: Json[] | null
          Contact?: Json | null
          "Driver License"?: Json[] | null
          Education?: Json[] | null
          "Employment Status"?: Json[] | null
          Hiring?: Json | null
          Job?: Json | null
          "Job Information"?: Json[] | null
          org_name?: string
          picture?: string | null
          "Social Links"?: Json | null
          "Stock Options"?: Json[] | null
          supervisor_id?: string | null
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
            foreignKeyName: "profiles_supervisor_id_fkey"
            columns: ["supervisor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
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
      roles: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          org_name: string
          permissions: string[]
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          org_name: string
          permissions: string[]
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          org_name?: string
          permissions?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "roles_org_name_fkey"
            columns: ["org_name"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["name"]
          }
        ]
      }
      settings: {
        Row: {
          AppliementForm: Json | null
          default_hours_per_day: number[]
          Hiring: Json | null
          job: Json | null
          org_name: string
          personnal: Json | null
        }
        Insert: {
          AppliementForm?: Json | null
          default_hours_per_day?: number[]
          Hiring?: Json | null
          job?: Json | null
          org_name: string
          personnal?: Json | null
        }
        Update: {
          AppliementForm?: Json | null
          default_hours_per_day?: number[]
          Hiring?: Json | null
          job?: Json | null
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
      user_emails: {
        Row: {
          admin_receiver: string | null
          candidate_sender: number | null
          created_at: string
          email: string | null
          email_object: string | null
          id: number
        }
        Insert: {
          admin_receiver?: string | null
          candidate_sender?: number | null
          created_at?: string
          email?: string | null
          email_object?: string | null
          id?: number
        }
        Update: {
          admin_receiver?: string | null
          candidate_sender?: number | null
          created_at?: string
          email?: string | null
          email_object?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_emails_admin_receiver_fkey"
            columns: ["admin_receiver"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_emails_candidate_sender_fkey"
            columns: ["candidate_sender"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      json_matches_schema: {
        Args: {
          schema: Json
          instance: Json
        }
        Returns: boolean
      }
      jsonb_matches_schema: {
        Args: {
          schema: Json
          instance: Json
        }
        Returns: boolean
      }
      jsonschema_is_valid: {
        Args: {
          schema: Json
        }
        Returns: boolean
      }
      jsonschema_validation_errors: {
        Args: {
          schema: Json
          instance: Json
        }
        Returns: unknown
      }
    }
    Enums: {
      database_leave_policies_policy_type:
        | "manual"
        | "traditional"
        | "unlimited"
      leave_request_status_type:
        | "pending"
        | "approved"
        | "rejected"
        | "canceled"
    }
    CompositeTypes: {
      job_details: {
        job_status: string
        department: string
        hiring_lead: string
        job_location: string
        posting_title: string
        job_description: string
        internal_job_code: string
        minimum_experience: string
      }
      job_information_type: {
        job_status: string
        department: string
        hiring_lead: string
        job_location: string
        posting_title: string
        job_description: string
        internal_job_code: string
        minimum_experience: string
      }
      leave_balance_type: {
        balance: number
        policy_id: number
        categories_id: number
      }
      leave_request_duration_used_type: {
        date: string
        duration: number
      }
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
