
import { Table } from './types';

export const SCHEMA_DATA: Table[] = [
  {
    name: 'profiles',
    columns: [
      { name: 'id', type: 'uuid', comment: 'references auth.users.id, mismo id que el usuario autenticado', isPrimaryKey: true },
      { name: 'name', type: 'string', comment: 'nombre público del usuario' },
      { name: 'avatar_url', type: 'string', comment: 'enlace a la foto de perfil' },
      { name: 'bio', type: 'string', comment: 'pequeña descripción del usuario' },
      { name: 'created_at', type: 'timestamp', comment: 'fecha de creación del perfil' }
    ]
  },
  {
    name: 'courses',
    columns: [
      { name: 'id', type: 'serial', comment: 'id autoincremental del curso', isPrimaryKey: true },
      { name: 'title', type: 'string', comment: 'título del curso' },
      { name: 'description', type: 'string', comment: 'texto corto para explicar el curso' },
      { name: 'is_premium', type: 'boolean', comment: 'true si requiere créditos/suscripción' },
      { name: 'author_id', type: 'uuid', comment: 'references profiles.id, autor del curso' },
      { name: 'language_id', type: 'int', comment: 'references languages.id, idioma del curso' },
      { name: 'created_at', type: 'timestamp', comment: 'fecha de publicación del curso' }
    ]
  },
  {
    name: 'languages',
    columns: [
      { name: 'id', type: 'serial', comment: 'primary key', isPrimaryKey: true },
      { name: 'code', type: 'string', comment: 'código de idioma (ej: es, en, fr)' },
      { name: 'name', type: 'string', comment: 'nombre del idioma' }
    ]
  },
  {
    name: 'course_blocks',
    columns: [
      { name: 'id', type: 'serial', comment: 'primary key', isPrimaryKey: true },
      { name: 'course_id', type: 'int', comment: 'references courses.id, a qué curso pertenece' },
      { name: 'block_order', type: 'int', comment: 'orden en que aparece el bloque dentro del curso' },
      { name: 'type', type: 'enum', comment: 'text, image, video, quiz' },
      { name: 'content', type: 'jsonb', comment: 'guarda el contenido (ej: texto, url, preguntas)' },
      { name: 'created_at', type: 'timestamp', comment: '' }
    ]
  },
  {
    name: 'progress',
    columns: [
      { name: 'id', type: 'serial', comment: 'primary key', isPrimaryKey: true },
      { name: 'user_id', type: 'uuid', comment: 'references auth.users.id' },
      { name: 'course_id', type: 'int', comment: 'references courses.id' },
      { name: 'current_block', type: 'int', comment: 'número del bloque en el que está el usuario' },
      { name: 'completed', type: 'boolean', comment: 'si terminó el curso' },
      { name: 'updated_at', type: 'timestamp', comment: 'última vez que se actualizó el progreso' }
    ]
  },
  {
    name: 'quiz_answers',
    columns: [
      { name: 'id', type: 'serial', comment: 'primary key', isPrimaryKey: true },
      { name: 'user_id', type: 'uuid', comment: 'references auth.users.id' },
      { name: 'course_block_id', type: 'int', comment: 'references course_blocks.id, bloque tipo quiz' },
      { name: 'selected_option', type: 'jsonb', comment: 'respuesta seleccionada por el usuario' },
      { name: 'is_correct', type: 'boolean', comment: 'si acertó o no' },
      { name: 'answered_at', type: 'timestamp', comment: 'cuándo respondió' }
    ]
  },
  {
    name: 'points',
    columns: [
      { name: 'id', type: 'serial', comment: 'primary key', isPrimaryKey: true },
      { name: 'user_id', type: 'uuid', comment: 'references auth.users.id' },
      { name: 'balance', type: 'int', comment: 'puntos actuales del usuario' },
      { name: 'last_update', type: 'timestamp', comment: '' }
    ]
  },
  {
    name: 'transactions',
    columns: [
      { name: 'id', type: 'serial', comment: 'primary key', isPrimaryKey: true },
      { name: 'user_id', type: 'uuid', comment: 'references auth.users.id' },
      { name: 'type', type: 'enum', comment: 'credit_purchase, subscription, course_unlock, reward' },
      { name: 'amount', type: 'int', comment: 'número de créditos/puntos sumados o restados' },
      { name: 'created_at', type: 'timestamp', comment: '' }
    ]
  },
  {
    name: 'streaks',
    columns: [
      { name: 'id', type: 'serial', comment: 'primary key', isPrimaryKey: true },
      { name: 'user_id', type: 'uuid', comment: 'references auth.users.id' },
      { name: 'streak_count', type: 'int', comment: 'número de días seguidos activos' },
      { name: 'last_active', type: 'date', comment: 'última fecha en la que el usuario estuvo activo' },
      { name: 'updated_at', type: 'timestamp', comment: '' }
    ]
  }
];
