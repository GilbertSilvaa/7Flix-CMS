using MongoDB.Bson.Serialization.Attributes;

namespace Vizer.API.Entities;

public abstract class EntityBase
{
  [BsonId]
  public string Id { get; set; } = string.Empty;

  [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
  public DateTime CreateAt { get; set; } = DateTime.Now;

  [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
  public DateTime? UpdateAt { get; set;}
}
