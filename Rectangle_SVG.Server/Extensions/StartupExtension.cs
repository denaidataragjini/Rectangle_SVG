using Rectangle_SVG.Server.BLL;

namespace Rectangle_SVG.Server.Extensions;

public static class StartupExtension
{
    public static IServiceCollection InjectServices(this IServiceCollection services)
    {
        services.AddTransient<IRectangleSVGService, RectangleSVGService>();


        #region Cors Policy

        services.AddCors(options =>
        {
            options.AddPolicy("AllowOrigin",
                builder =>
                {
                    builder.WithOrigins("https://localhost:4200")
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
        });
        #endregion

        return services;
    }
}
