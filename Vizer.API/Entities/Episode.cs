using Vizer.API.ValueObjects;

namespace Vizer.API.Entities;

public class Episode : Midia
{
  public int Number { get; set; }
  public int Season { get; set; } 
  public Video? Video { get; set; } 
}
