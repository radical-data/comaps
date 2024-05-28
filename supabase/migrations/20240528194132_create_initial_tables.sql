-- supabase/migrations/<timestamp>_create_tables_with_postgis.sql

-- Enable PostGIS extension
create extension if not exists postgis;

-- Create the maps table
create table if not exists maps (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    domain text not null,
    description text,
    created_at timestamp default now() not null,
    last_modified timestamp default now() not null,
    style text
);

-- Create the data_submissions table
create table if not exists data_submissions (
    id uuid primary key default uuid_generate_v4(),
    map_id uuid references maps(id) not null,
    data_type text not null,
    data_content text not null,
    created_at timestamp default now() not null,
    submitted_by text,
    location geometry(Point, 4326),
    timestamp timestamp
);
