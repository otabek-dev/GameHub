using GameHub.Backend;
using GameHub.Backend.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = JwtData.ISSUER,
        ValidAudience = JwtData.AUDIENCE,
        IssuerSigningKey = JwtData.GetSymmetricSecurityKey()
    };

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];
            var path = context.HttpContext.Request.Path;

            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/platformHub"))
                context.Token = accessToken;

            return Task.CompletedTask;
        }
    };
});

var app = builder.Build();

app.UseCors();

app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();

app.MapHub<PlatformHub>("/platformHub");
app.MapControllers();

app.Run();
