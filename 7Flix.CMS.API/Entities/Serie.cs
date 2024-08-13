namespace Vizer.API.Entities;

public class Serie : Midia
{
  public string Category { get; set; } = string.Empty;
  public float Review { get; set; } 
  public int NumberSeasons { get; set; } 
  public ICollection<Episode> Episodes { get; set; } = [];
}
