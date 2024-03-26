using Microsoft.EntityFrameworkCore;
using server.DAL;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<DB>(options =>
{
    options.UseSqlite(builder.Configuration["ConnectionStrings:DbConnection"]);
});

var clientUrl = builder.Configuration["ClientUrl"] ?? throw new ArgumentNullException("ClientUrl is not set in appsettings.json");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowViteApp", builder =>
    {
        builder
            .WithOrigins(clientUrl)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseCors("AllowViteApp");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();