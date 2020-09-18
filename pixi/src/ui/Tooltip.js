// Copyright 2020 The AMPHTML Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const FOCUSABLE_ELEMENTS = 'a[href], button';

export default class Tooltip {
  constructor(container) {
    this.container = container;
    this.tooltip = this.container.querySelector('.ap-m-tooltip');
    this.content = this.container.querySelector('.ap-m-tooltip-tip');
    this.focusableEls = this.container.querySelectorAll(FOCUSABLE_ELEMENTS);
    this.focusedElIndex = 0;

    this.content.addEventListener('keydown', async (e) => {
      if (e.keyCode === 27) {
        await this.closeTooltip();
      } else if (e.keyCode === 9) {
        if (e.shiftKey) {
          this.focusedElIndex -= 1;
        } else {
          this.focusedElIndex += 1;
        }
        if (
          this.focusedElIndex < 0 ||
          this.focusedElIndex >= this.focusableEls.length
        ) {
          await this.closeTooltip();
        }
      }
    });
  }

  async closeTooltip() {
    const current = await AMP.getState('hideTooltip');
    this.focusedElIndex = 0;
    AMP.setState({hideTooltip: current !== 'true'});
    this.tooltip.classList.remove('active');
  }
}
