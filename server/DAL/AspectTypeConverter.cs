using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using server.Models;

public class AspectTypeConverter : JsonConverter<AspectType>
{
    public override AspectType Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = reader.GetString() ?? throw new JsonException("Null, is not a valid AspectType.");
        return value.ToLower() switch
        {
            "function" => AspectType.Function,
            "product" => AspectType.Product,
            "location" => AspectType.Location,
            "empty" => AspectType.Empty,
            _ => throw new JsonException($"Value '{value}' is not recognized as a valid AspectType.")
        };
    }

    public override void Write(Utf8JsonWriter writer, AspectType value, JsonSerializerOptions options)
    {
        var stringValue = value switch
        {
            AspectType.Function => "function",
            AspectType.Product => "product",
            AspectType.Location => "location",
            AspectType.Empty => "empty",
            _ => throw new JsonException($"'{value}' is not a valid AspectType value.")
        };
        writer.WriteStringValue(stringValue);
    }
}
