using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using server.DAL;

namespace server.Models;

public class Node
{
    public int Id { get; set; }
    public required NodeData Data { get; set; }
    public required Position Position { get; set; }
    public required string Type { get; set; }
}

public class Position
{
    public double X { get; set; }
    public double Y { get; set; }
}

public class NodeData
{
    public AspectType Aspect { get; set; }
    public bool? HasTerminal { get; set; }
     [NotMapped]
    public List<Terminal>? Terminals { get; set; }
    public string? TerminalOf { get; set; }
    public string? TransfersTo { get; set; }
    public string? TransferedBy { get; set; }
    [NotMapped]
    public List<ConnectedTo>? ConnectedTo { get; set; }
    public bool? HasDirectPart { get; set; }
     [NotMapped]
    public List<DirectPart>? DirectParts { get; set; }
    public string? DirectPartOf { get; set; }
     [NotMapped]
    public List<FulfilledBy>? FulfilledBy { get; set; }
     [NotMapped]
    public List<FullFills>? FullFills { get; set; }
    public string? Id { get; set; }
    public string? Label { get; set; }
    public string? Type { get; set; }
    public long CreatedAt { get; set; }
    public long UpdatedAt { get; set; }
    public string? CustomName { get; set; } = string.Empty;
}

[JsonConverter(typeof(AspectTypeConverter))]
public enum AspectType
{
    Function,
    Product,
    Location,
    Empty
}


public class Terminal
{
    public required string Id { get; set; }
}

public class ConnectedTo
{
    public required string Id { get; set; }
}

public class DirectPart
{
    public required string Id { get; set; }
}

public class FulfilledBy
{
    public required string Id { get; set; }
}

public class FullFills
{
    public required string Id { get; set; }
}
