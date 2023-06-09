using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace GameHub.Backend
{
    public class JwtData
    {
        private const string KEY = "superSecretKey@345Meaga";
        public const string ISSUER = "MyAuthServer";
        public const string AUDIENCE = "MyAuthClient";
        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }
}
