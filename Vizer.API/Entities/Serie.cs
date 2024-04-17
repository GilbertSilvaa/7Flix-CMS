namespace Vizer.API.Entities;

public class Serie : Midia
{
  public string Category { get; set; } = string.Empty;
  public float Review { get; set; } 
  public int NumberEpisodes { get; set; } 
  public IEnumerable<Episode> Episodes { get; set; } = [];
}
