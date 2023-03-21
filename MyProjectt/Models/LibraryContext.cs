using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MyProjectt.Models;

public partial class LibraryContext : DbContext
{
    public LibraryContext()
    {
    }

    public LibraryContext(DbContextOptions<LibraryContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<User> Users { get; set; }
    public void Seed()
    {
        var users = new List<User>
            {

        new User { UserId = "1", Email = "john.smith@example.com" ,Password = "23F23gfb4"},
        new User { UserId = "2", Email = "jane.doe@example.com" ,Password = "232Dfv3gfb4"},
        new User { UserId = "3", Email = "bob.johnson@example.com" ,Password = "2323Ergfb4"}
    };
        var projects = new List<Project>
            {
                new Project
                {
                    ProjectId = "5fb9953b8214b6df37174d",
                    Name =  "Backend Project",
                    Score =  88,
                    DurationInDays = 35,
                    BugsCount =  74,
                    MadeDadeline = false,
                    IdUser = "1",
                },
                 new Project
                {
                    ProjectId = "5fb9953bd98214b6df37174d",
                    Name =  "Frontend Project",
                    Score =  88,
                    DurationInDays = 35,
                    BugsCount =  74,
                    MadeDadeline = false,
                    IdUser = "2",

                },
                  new Project
                {
                    ProjectId = "5fb99536714b637174d",
                    Name =  "Backend Project",
                    Score =  88,
                    DurationInDays = 35,
                    BugsCount =  74,
                    MadeDadeline = false,
                    IdUser = "3",

                },
    };
        if (this.Users.Count() == 0)
        {
            users.ForEach(u => this.Users.Add(u));
            this.SaveChanges();
        }
        if (this.Projects.Count() == 0)
        {
            projects.ForEach(p => this.Projects.Add(p));
            this.SaveChanges();
        }


    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=LAPTOP-GLL1KP10;Database=Project;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>(entity =>
        {
            entity.Property(e => e.ProjectId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("projectId");
            entity.Property(e => e.BugsCount).HasColumnName("bugsCount");
            entity.Property(e => e.DurationInDays).HasColumnName("durationInDays");
            entity.Property(e => e.IdUser)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("idUser");
            entity.Property(e => e.MadeDadeline).HasColumnName("madeDadeline");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Score).HasColumnName("score");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.Projects)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Projects__idUser__3F466844");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK_Users2");

            entity.Property(e => e.UserId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("userId");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("password");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
