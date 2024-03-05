using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.DAL;

public class DB : DbContext {
    public DB(DbContextOptions<DB> options) : base(options) {
        Database.EnsureCreated();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Node>()
                .OwnsOne(n => n.Position);
        modelBuilder.Entity<Node>()
                .OwnsOne(n => n.Data);
    }

    public DbSet<Node> Nodes { get; set;}
}
