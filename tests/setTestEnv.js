if (!process.env.POSTGRES_URI) {
  process.env.POSTGRES_URI = 'postgres://app:password@localhost:5431/db';
}
