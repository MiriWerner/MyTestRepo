using System;
using System.Collections.Generic;

namespace MyProjectt.Models;

public partial class Project
{
    public string ProjectId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public int Score { get; set; }

    public int DurationInDays { get; set; }

    public bool MadeDadeline { get; set; }

    public int BugsCount { get; set; }

    public string IdUser { get; set; } = null!;

    public virtual User IdUserNavigation { get; set; }
}
