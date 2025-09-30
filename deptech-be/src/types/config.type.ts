export interface DBConfig {
    username: string;
    password: string | null;
    database: string;
    host: string;
    port: number;
    dialect: string;
    dialectOptions?: any;
    pool?: any;
    logging?: any;
    use_env_variable?: string | undefined;
}
