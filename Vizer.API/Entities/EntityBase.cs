using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Vizer.API.Entities;

public abstract class EntityBase
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

  [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
  public DateTime CreateAt { get; set; } = DateTime.Now;

  [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
  public DateTime? UpdateAt { get; set;}
}
