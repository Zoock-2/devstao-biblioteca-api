ALTER TABLE livros
ADD COLUMN categoria ENUM(
    'ficcao',
    'romance',
    'ficcao-cientifica',
    'fantasia',
    'misterio',
    'horror',
    'thriller',
    'nao-ficcao',
    'politico',
    'biografia',
    'outros'
) NOT NULL DEFAULT 'outros';
