using System;
using System.Collections.Generic;

namespace MyProjectt.Models;

public partial class User
{
    public string UserId { get; set; } = null!;

    public string? Email { get; set; }

    public string? Password { get; set; }

    public virtual ICollection<Project> Projects { get; } = new List<Project>();
}
