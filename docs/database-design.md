# StudyMate Database Design

## Entity-Relationship Diagram

```mermaid
erDiagram
  USERS ||--o{ STUDY_SETS : creates
  STUDY_SETS ||--o{ QUIZ_QUESTIONS : contains
  USERS {
    serial id PK
    varchar name
    varchar email
    varchar password_hash
    timestamp created_at
  }
  STUDY_SETS {
    serial id PK
    integer user_id FK
    varchar topic
    text original_content
    text generated_notes
    timestamp created_at
    timestamp updated_at
  }
  QUIZ_QUESTIONS {
    serial id PK
    integer study_set_id FK
    text question_text
    varchar option_a
    varchar option_b
    varchar option_c
    varchar option_d
    varchar correct_option
    timestamp created_at
  }
```

## Relationships

- One user has many study sets (`study_sets.user_id` references `users.id`, `ON DELETE CASCADE`)
- One study set has many quiz questions (`quiz_questions.study_set_id` references `study_sets.id`, `ON DELETE CASCADE`)
- `quiz_questions` is schema-only; not yet populated by the application (see README, Known Limitations)

Full column definitions and constraints: `config/schema.sql`.