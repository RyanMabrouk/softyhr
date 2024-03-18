import { Database } from "@/types/database.types";

export type statusType =
  Database["public"]["Tables"]["candidate_statuses"]["Row"];

export type InsertStatusType =
  Database["public"]["Tables"]["candidate_statuses"]["Insert"];

export type sourcesType =
  Database["public"]["Tables"]["candidate_sources"]["Row"];

export type InsertSourcesType =
  Database["public"]["Tables"]["candidate_sources"]["Insert"];
