using Vizer.API.ValueObjects;

namespace Vizer.API.Entities;

public class Movie : Midia
{
  public string Category { get; set; } = string.Empty;
  public float Review { get; set; }
  public Video? Video { get; set; }
}
