/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import identity from 'lodash/identity';
import React, {
  ComponentType as CT, EventHandler, FC,
  useRef,
} from 'react';
import pick from 'lodash/pick';
import { HOC } from '@bodiless/fclasses';
import { useExtendHandler, useClickOutside } from './hooks';

/**
 * Utility hoc to add an event handler which extends any handler passed to
 * the original component.
 *
 * Only adds the extension when in edit mode.
 *
 * @param event The name of the event whose handler is to be extended
 * @param useExtender Custom hook returning the handler to add. Will be invoked
 *        during render and receive the original props of the component.
 *
 * @return An HOC which will add the handler.
 */
export const withExtendHandler = <P extends object>(
  event: string,
  useExtender: (props: P) => EventHandler<any>,
): HOC => Component => {
    const WithExtendHandler: FC<any> = props => (
      <Component
        {...props}
        {...useExtendHandler(event, useExtender(props), props)}
      />
    );
    return WithExtendHandler;
  };

/*
 * Creates an HOC which strips all but the specified props.
 *
 * @param keys A list of the prop-names to keep.
 *
 * @return An HOC which will strip all but the specified props.
 */
export const withOnlyProps = <Q extends object>(...keys: string[]) => (
  <P extends object>(Component: CT<P> | string) => {
    const WithOnlyProps: FC<P & Q> = props => <Component {...pick(props, keys) as P} />;
    return WithOnlyProps;
  }
);

export const withContextActivator = identity;

export const withLocalContextMenu: HOC = identity;

export type ClickOutsideProps = {
  onClickOutside?: (e: KeyboardEvent | MouseEvent) => void;
};

/**
 * Utility hoc to add onClickOutside handler to the original component.
 * A callback will be executed on both click outside as well as on the `esc` keypress.
 *
 * @return An HOC which will add the handler.
 */
export const withClickOutside = <P extends object>(Component: CT<P> | string) => {
  const WithClickOutside = (props: P & ClickOutsideProps) => {
    const { onClickOutside } = props;
    const ref = useRef(null);

    // Only add listners if onClickOutside handler is defined
    if (typeof onClickOutside === 'function') {
      useClickOutside(ref, onClickOutside);
    }

    return (
      <div ref={ref}>
        <Component {...props} />
      </div>
    );
  };

  return WithClickOutside;
};

export type resizeDetectorProps = {
  onResizeObserver?: (
    ref:React.MutableRefObject<any>,
    entries: ResizeObserverEntry[],
  ) => void;
};

export const withResizeDetector = <P extends object>(Component: CT<P> | string) => {
  const WithResizeDetector = (props: P & resizeDetectorProps) => <Component {...props} />;

  return WithResizeDetector;
};
