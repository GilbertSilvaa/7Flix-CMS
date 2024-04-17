namespace Vizer.API.ValueObjects;

public record Video(
  string Url,
  string StreamForma,
  long Duration
);