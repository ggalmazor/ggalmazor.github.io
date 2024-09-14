module Filters
  def transform(items, attribute)
    raise ArgumentError, "#{items.inspect} is not an array" unless items.is_a?(Array)

    items.map do |item|
      if item.is_a?(Hash)
        (item[attribute.to_sym] || item[attribute.to_s])
      else
        item.send(attribute.to_sym)
      end
    end
  end

  def attribute(object, attribute)
    return (object[attribute.to_sym] || item[attribute.to_s]) if object.is_a?(Hash)

    object.send(attribute.to_sym)
  end
end

Liquid::Template.register_filter Filters