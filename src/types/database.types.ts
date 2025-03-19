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
      appointments: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string | null
          service: string
          appointment_date: string
          appointment_time: string
          message: string | null
          status: string
          patch_tested: boolean | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone?: string | null
          service: string
          appointment_date: string
          appointment_time: string
          message?: string | null
          status?: string
          patch_tested?: boolean | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string | null
          service?: string
          appointment_date?: string
          appointment_time?: string
          message?: string | null
          status?: string
          patch_tested?: boolean | null
        }
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
  }
}