namespace backend.Src.Util
{
    // Esta clase es una ayuda para desecriptar y verificar que la contraseña sea correcta.
    public class BCryptHelper
    {
        /// <summary>
        /// Método para verificar que la contraseña sea correcta. Desencripta la contraseña y la compara con la contraseña ingresada.
        /// </summary>
        /// <param name="password">
        /// - password: Contraseña a desencriptar.
        /// </param>
        /// <returns>
        /// True si la contraseña es correcta, false si no lo es.
        /// </returns>
        public static bool CheckPassword(string? password, string? hash)
        {
            if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(hash)) return false;
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
    }
}