# Twig Braces Helper

[![](https://vsmarketplacebadges.dev/version/zepich.twig-braces-helper.png)](https://marketplace.visualstudio.com/items?itemName=zepich.twig-braces-helper)
[![](https://vsmarketplacebadges.dev/installs-short/zepich.twig-braces-helper.png)](https://marketplace.visualstudio.com/items?itemName=zepich.twig-braces-helper)
[![](https://vsmarketplacebadges.dev/rating-short/zepich.twig-braces-helper.png)](https://marketplace.visualstudio.com/items?itemName=zepich.twig-braces-helper)

A helper which adds spaces and percentage sign when working with Twig templates.

## Features

The extension will add an additional space after the curser, when adding two opening curly braces

Before:

    {{ |}}
       ^cursor

After:

    {{ | }}
       ^cursor

If a curly brace followed by a percent sign is entered, the extension will add a space and another percentage sign to the closing sign

Before:

    {% |}
       ^cursor

After:

    {% | %}
       ^cursor

If a curly brace followed by a number sign is entered, the extension will add a space and another number sign to the closing sign

Before:

    {# |}
       ^cursor

After:

    {# | #}
       ^cursor

The extension expects that the closing brace is added by the editor in general and executes its function after the first space was added.

## Configuration

All options are by default enabled.

- `twig-braces-helper.enable`: enable/disable the extension.

## Based on

This extension is based on the extension [Spaces Inside Braces](https://marketplace.visualstudio.com/items?itemName=AiryShift.spaces-inside-braces) from [AiryShift](https://github.com/AiryShift). Thank you very much for the work!

## Icon

The icon is from the set "Curly Brackets" by Marek Polakovic from the Noun Project, available at [The Noun Project](https://thenounproject.com/term/curly-brackets/108564/) under Creative Commons Attribution 3.0 (CC BY 3.0 US).
Full terms at [Creative Commons](https://creativecommons.org/licenses/by/3.0/us/).

The icon was cropped and resized from its original resolution to 128 by 128 pixels.
